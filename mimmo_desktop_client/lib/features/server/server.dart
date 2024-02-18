import 'dart:io';
import 'package:logger/logger.dart' as l;
import 'package:shelf_virtual_directory/shelf_virtual_directory.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as io_server;

Future runServer() async {
  final dir = "${Directory.current.path.replaceAll("\\", '/')}/client/";

  final virDirHandler = ShelfVirtualDirectory(dir).handler;

  final staticFileHandler = const Pipeline()
      .addMiddleware(logRequests())
      .addHandler(virDirHandler); //used as a handler

  await io_server
      .serve(Cascade().add(staticFileHandler).handler, "127.0.0.1", 5100)
      .then((server) {
    l.Logger().w('Server is sunning at ${server.address}:${server.port}');
  });
}
