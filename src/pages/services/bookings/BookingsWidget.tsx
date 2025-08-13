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

// function BookingWidget() {
//   const widgetContainerRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = "//widget.simplybook.me/v2/widget/widget.js";
//     script.onload = () => {
//       new SimplybookWidget({ "widget_type": "iframe", "url": "https:\/\/astrolumina.simplybook.me", "theme": "skittish", "theme_settings": { "timeline_hide_unavailable": "1", "hide_past_days": "0", "timeline_show_end_time": "0", "timeline_modern_display": "as_slots", "sb_base_color": "#e8d8a5", "display_item_mode": "block", "body_bg_color": "#fffaf5", "sb_review_image": "", "dark_font_color": "#474747", "light_font_color": "#ffffff", "btn_color_1": "#c98e5a", "sb_company_label_color": "#372515", "hide_img_mode": "0", "sb_busy": "#c7b3b3", "sb_available": "#d6ebff" }, "timeline": "modern", "datepicker": "top_calendar", "is_rtl": false, "app_config": { "clear_session": 1, "allow_switch_to_ada": 1, "predefined": { "provider": "2", "service": "2", "category": "1" } }, "container_id": "sbw_uibtx8" });
//       // Add a small delay before hiding the loading animation to ensure widget is rendered
//       setTimeout(() => setIsLoading(false), 1500);
//     };
//     document.head.appendChild(script);
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="relative">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
//           <div className="flex flex-col items-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
//             <p className="mt-4 text-lg text-gray-600">Se încarcă calendarul...</p>
//           </div>
//         </div>
//       )}
//       <div id="sbw_uibtx8" ref={widgetContainerRef} className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}></div>
//     </div>
//   );
// }

export default CalEventWidget;
