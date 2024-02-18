import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mimmo_desktop_client/features/webclient/webclient_controller.dart';
import 'package:webview_windows/webview_windows.dart';

class MimmoWebView extends StatelessWidget {
  const MimmoWebView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = useWebClient();
    return Scaffold(
      body: Obx(() => Visibility(
            visible: controller.showWebClient.value,
            child: Webview(
              controller.client,
              permissionRequested: controller.onPermissionRequested,
            ),
          )),
    );
  }
}
