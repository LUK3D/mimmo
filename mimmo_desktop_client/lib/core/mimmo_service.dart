import 'dart:async';

import 'package:get/get.dart';
import 'package:webview_windows/webview_windows.dart';

enum MimmoEvents {
  mimmoCommand(0),
  start(1),
  stop(2),
  message(3);

  const MimmoEvents(this.value);
  final int value;
}

class MimmoService extends GetxService {
  Function? onMimmoCommand;
  Function? onStartListening;
  Function? onStopListening;
  Function? onMessage;

  WebviewController? webViewController;

  int wordInterval = 2;
  Timer? ensureStop;

  bool isSpeaking = false;

  MimmoService(
      {this.onMimmoCommand,
      this.onStartListening,
      this.onStopListening,
      this.onMessage});

  void init(WebviewController tmpController) {
    webViewController = tmpController;
    webViewController?.webMessage.listen((event) async {
      if (event['command'] == MimmoEvents.mimmoCommand.value) {
        if (onMimmoCommand != null) onMimmoCommand!();
      }
      if (event['command'] == MimmoEvents.start.value) {
        if (onStartListening != null) onStartListening!();
        isSpeaking = true;
      }
      if (event['command'] == MimmoEvents.stop.value) {
        if (onStopListening != null) onStopListening!();
        isSpeaking = false;
      }
      if (event['command'] == MimmoEvents.message.value) {
        if (onMessage != null) onMessage!(event['message']);
      }
      //  Logger().e(event["command"]);
    });
  }

  void checkSilence() {
    ensureStop?.cancel();
    if (isSpeaking == true) {
      ensureStop = Timer.periodic(Duration(seconds: wordInterval), (timer) {
        isSpeaking = false;
        if (onStopListening != null) onStopListening!();
      });
    }
  }

  void sendPrompt(String prompt) async {
    if (prompt.isEmpty) {
      return;
    }

    //Here we can send the prompt to Ollama
  }
}

MimmoService useMimmo({
  Function? onMimmoCommand,
  Function? onStartListening,
  Function? onStopListening,
  Function? onMessage,
}) =>
    Get.put(MimmoService(
      onMimmoCommand: onMimmoCommand,
      onStartListening: onStartListening,
      onStopListening: onStopListening,
      onMessage: onMessage,
    ));
