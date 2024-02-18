import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:logger/logger.dart';
import 'package:mimmo_desktop_client/features/server/server.dart';
import 'package:webview_windows/webview_windows.dart';

final navigatorKey = GlobalKey<NavigatorState>();

class WebClientController extends GetxController {
  final client = WebviewController();
  final showWebClient = true.obs;

  Future<WebviewPermissionDecision> onPermissionRequested(
      String url, WebviewPermissionKind kind, bool isUserInitiated) async {
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

  @override
  void onInit() async {
    await client.initialize();
    super.onInit();

    await runServer();
    await client.setBackgroundColor(Colors.transparent);
    await client.setPopupWindowPolicy(WebviewPopupWindowPolicy.deny);
    await client.loadUrl('http://127.0.0.1:5100').then((value) {
      showWebClient.refresh();
    });
    showWebClient.refresh();
  }
}

WebClientController useWebClient() => Get.put(WebClientController());
