import React, { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

function CalEventWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "consultatie-astrologica" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "week_view" });
    })();
  }, [])

  return <Cal namespace="consultatie-astrologica"
    calLink="babioli-revioli/consultatie-astrologica"
    style={{ width: "100%", height: "100%", overflow: "scroll" }}
    config={{ "layout": "week_view" }}
  />;
};

export default CalEventWidget;
