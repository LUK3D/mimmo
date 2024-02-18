import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:logger/logger.dart';
import 'package:mimmo_desktop_client/core/mimmo_service.dart';
import 'package:mimmo_desktop_client/features/server/server.dart';
import 'package:webview_windows/webview_windows.dart';

final navigatorKey = GlobalKey<NavigatorState>();

class WebClientController extends GetxController {
  final client = WebviewController();
  final showWebClient = true.obs;

  final listening = false.obs;
  final userInputText = "".obs;

  Future<WebviewPermissionDecision> onPermissionRequested(
      String url, WebviewPermissionKind kind, bool isUserInitiated) async {
    if (kind == WebviewPermissionKind.microphone) {
      return WebviewPermissionDecision.allow;
    }

    final decision = await showDialog<WebviewPermissionDecision>(
      context: navigatorKey.currentContext!,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('WebView permission requested'),
        content: Text('WebView has requested permission \'$kind\''),
        actions: <Widget>[
          TextButton(
            onPressed: () =>
                Navigator.pop(context, WebviewPermissionDecision.deny),
            child: const Text('Deny'),
          ),
          TextButton(
            onPressed: () =>
                Navigator.pop(context, WebviewPermissionDecision.allow),
            child: const Text('Allow'),
          ),
        ],
      ),
    );

    return decision ?? WebviewPermissionDecision.none;
  }

  void oncommand() {
    Logger().w("[MIMMO]: ACTIVATE");
  }

  void onstart() {
    Logger().w("[MIMMO]: LISTENING");
    listening.value = true;
  }

  void onstop() {
    Logger().w("[MIMMO]: DEACTIVATE");
    Logger().w("[MIMMO MESSAGE]: ${userInputText.value}");

    useMimmo().sendPrompt(userInputText.value);
    listening.value = false;
    userInputText.value = "";
  }

  void onMessage(String message) {
    if (listening.value || message.isNotEmpty) {
      var tmpMessage = userInputText.value;

      if (message.contains(tmpMessage)) {
        tmpMessage = message;
      } else {
        final parts = message.split(userInputText.value);

        if (parts.length > 2) {
          var partZero = parts[0];

          final result = parts.where((element) => element != partZero).toList();
          tmpMessage = "$partZero ${result.join("")}";
        } else {
          tmpMessage = parts.join(" ");
        }

        // tmpMessage = ("${userInputText.value} $message");
      }
      userInputText.value = tmpMessage.isEmpty ? message : tmpMessage;
    }
    // Logger().w(message);
  }

  @override
  void onInit() async {
    await client.initialize();
    super.onInit();

    await runServer();
    await client.setBackgroundColor(Colors.transparent);
    await client.setPopupWindowPolicy(WebviewPopupWindowPolicy.deny);

    final mimmo = useMimmo(
      onMimmoCommand: oncommand,
      onStartListening: onstart,
      onStopListening: onstop,
      onMessage: onMessage,
    );

    mimmo.init(client);

    await client
        .loadUrl(
            kReleaseMode ? 'http://127.0.0.1:5100' : 'http://localhost:5173')
        .then((value) {
      showWebClient.refresh();
    });
    showWebClient.refresh();
  }
}

WebClientController useWebClient() => Get.put(WebClientController());
