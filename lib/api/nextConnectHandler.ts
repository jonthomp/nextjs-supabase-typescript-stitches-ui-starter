import nextConnect from "next-connect";

function onError(err, req, res, next) {
  console.error(err);

  const _code = err.code || err.statusCode || 500;

  res.status(_code).json({
    error: { message: err.toString() || "Interal Server Error", code: _code },
  });
}

function onNoMatch(req, res) {
  res.status(404).json({
    error: { message: "Not Found", code: 404 },
  });
}

export function nextConnectHandler() {
  return nextConnect({
    attachParams: true,
    onError,
    onNoMatch,
  });
}
