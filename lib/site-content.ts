// Page markup as plain data, so lib/render.ts can turn it into the English and Spanish
// pages on the server without loading React, GSAP or CSS. SITE_HTML is the English
// source of truth; lib/i18n.ts holds the Spanish overrides, keyed by the data-i18n
// attributes inside SITE_HTML.
//
// This module is server-only: it must never be imported from a client component, or the
// ~96 KB string below ships in the browser bundle as well as in the HTML.

export const SITE_HTML = `<div id="top" data-pagepad="1">
<div id="gcs-grain" aria-hidden="true"></div>
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><symbol id="i-bold-map-pin-area" viewBox="0 0 256 256"><path d="M108,80a20,20,0,1,1,20,20A20,20,0,0,1,108,80ZM60,80a68,68,0,0,1,136,0c0,62.25-59.51,97-62.05,98.42a12,12,0,0,1-11.9,0C119.51,177,60,142.25,60,80Zm24,0c0,38.2,30.71,64.2,44,73.64C141.21,144.15,172,118,172,80a44,44,0,0,0-88,0Zm124.57,65.6a12,12,0,1,0-9.14,22.19C213.56,173.61,220,180.27,220,184c0,4-7.13,11.07-22.77,17.08-18.3,7-42.89,10.92-69.23,10.92s-50.93-3.88-69.23-10.92C43.12,195.07,36,188,36,184c0-3.73,6.44-10.39,20.57-16.21a12,12,0,1,0-9.14-22.19C31.27,152.25,12,164.31,12,184c0,34.14,58.36,52,116,52,29.22,0,56.86-4.44,77.85-12.52C220.1,218,244,205.59,244,184,244,164.31,224.73,152.25,208.57,145.6Z"/></symbol><symbol id="i-bold-app-window" viewBox="0 0 256 256"><path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,160H44V60H212ZM60,92a16,16,0,1,1,16,16A16,16,0,0,1,60,92Zm48,0a16,16,0,1,1,16,16A16,16,0,0,1,108,92Z"/></symbol><symbol id="i-bold-buildings" viewBox="0 0 256 256"><path d="M240,204H228V96a20,20,0,0,0-20-20H172V32a20,20,0,0,0-28.45-18.12l-104,48.54A20.06,20.06,0,0,0,28,80.55V204H16a12,12,0,0,0,0,24H240a12,12,0,0,0,0-24ZM204,100V204H172V100ZM52,83.09,148,38.3V204H52ZM132,112v12a12,12,0,0,1-24,0V112a12,12,0,0,1,24,0Zm-40,0v12a12,12,0,0,1-24,0V112a12,12,0,0,1,24,0Zm0,52v12a12,12,0,0,1-24,0V164a12,12,0,0,1,24,0Zm40,0v12a12,12,0,0,1-24,0V164a12,12,0,0,1,24,0Z"/></symbol><symbol id="i-bold-chat-circle-dots" viewBox="0 0 256 256"><path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"/></symbol><symbol id="i-bold-chats-circle" viewBox="0 0 256 256"><path d="M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z"/></symbol><symbol id="i-bold-envelope-simple" viewBox="0 0 256 256"><path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z"/></symbol><symbol id="i-bold-facebook-logo" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,191.13V156h20a12,12,0,0,0,0-24H140V112a12,12,0,0,1,12-12h16a12,12,0,0,0,0-24H152a36,36,0,0,0-36,36v20H96a12,12,0,0,0,0,24h20v55.13a84,84,0,1,1,24,0Z"/></symbol><symbol id="i-bold-globe-simple" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm83.13,96H179.56a144.3,144.3,0,0,0-21.35-66.36A84.22,84.22,0,0,1,211.13,116ZM128,207c-9.36-10.81-24.46-33.13-27.45-67h54.94a119.74,119.74,0,0,1-17.11,52.77A108.61,108.61,0,0,1,128,207Zm-27.45-91a119.74,119.74,0,0,1,17.11-52.77A108.61,108.61,0,0,1,128,49c9.36,10.81,24.46,33.13,27.45,67ZM97.79,49.64A144.3,144.3,0,0,0,76.44,116H44.87A84.22,84.22,0,0,1,97.79,49.64ZM44.87,140H76.44a144.3,144.3,0,0,0,21.35,66.36A84.22,84.22,0,0,1,44.87,140Zm113.34,66.36A144.3,144.3,0,0,0,179.56,140h31.57A84.22,84.22,0,0,1,158.21,206.36Z"/></symbol><symbol id="i-bold-handshake" viewBox="0 0 256 256"><path d="M253.88,108.11l-25.53-51a20,20,0,0,0-26.83-9L178.34,59.7,131.7,44.58a12.14,12.14,0,0,0-7.4,0L77.66,59.7,54.48,48.11a20,20,0,0,0-26.83,9L2.12,108.11a20,20,0,0,0,9,26.83l26.67,13.34,51.18,37.41A12.15,12.15,0,0,0,93,187.62l62,16a12.27,12.27,0,0,0,3,.38,12,12,0,0,0,8.48-3.52l52.62-52.62,25.83-12.92a20,20,0,0,0,8.95-26.83Zm-58.12,29.15-27.52-26a12,12,0,0,0-16.76.26c-9.66,9.74-25.06,16.81-40.81,9.55l38.19-37h22.72l25.81,51.63ZM47.32,71.37,60.59,78l-22,43.9-13.27-6.63Zm107,107.3L101.23,165l-42-30.66L85.17,82.5,128,68.61l1.69.55L90,107.68l-.13.12a20,20,0,0,0,3.4,31c20.95,13.39,46,12.07,66.33-2.73l19.2,18.15Zm63-56.77-22-43.9,13.27-6.63,21.95,43.9ZM118.55,219a12,12,0,0,1-14.62,8.62l-26.6-6.87a12,12,0,0,1-4.08-1.93L48.92,201a12,12,0,0,1,14.16-19.37l22.47,16.42,24.38,6.29A12,12,0,0,1,118.55,219Z"/></symbol><symbol id="i-bold-hard-hat" viewBox="0 0 256 256"><path d="M228,148.4V136a100.41,100.41,0,0,0-64-93.3V40a20,20,0,0,0-20-20H112A20,20,0,0,0,92,40v2.7A100.41,100.41,0,0,0,28,136v12.4A20,20,0,0,0,12,168v24a20,20,0,0,0,20,20H224a20,20,0,0,0,20-20V168A20,20,0,0,0,228,148.4ZM204,136v12H164V69.07A76.35,76.35,0,0,1,204,136ZM140,44V148H116V44ZM92,69.07V148H52V136A76.35,76.35,0,0,1,92,69.07ZM220,188H36V172H220Z"/></symbol><symbol id="i-bold-house-line" viewBox="0 0 256 256"><path d="M240,204H228V144a12,12,0,0,0,12.49-19.78L142.14,25.85a20,20,0,0,0-28.28,0L15.51,124.2A12,12,0,0,0,28,144v60H16a12,12,0,0,0,0,24H240a12,12,0,0,0,0-24ZM52,121.65l76-76,76,76V204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52ZM140,204H116V164h24Z"/></symbol><symbol id="i-bold-instagram-logo" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM176,20H80A60.07,60.07,0,0,0,20,80v96a60.07,60.07,0,0,0,60,60h96a60.07,60.07,0,0,0,60-60V80A60.07,60.07,0,0,0,176,20Zm36,156a36,36,0,0,1-36,36H80a36,36,0,0,1-36-36V80A36,36,0,0,1,80,44h96a36,36,0,0,1,36,36ZM196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Z"/></symbol><symbol id="i-bold-list" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"/></symbol><symbol id="i-bold-magnifying-glass-plus" viewBox="0 0 256 256"><path d="M156,112a12,12,0,0,1-12,12H124v20a12,12,0,0,1-24,0V124H80a12,12,0,0,1,0-24h20V80a12,12,0,0,1,24,0v20h20A12,12,0,0,1,156,112Zm76.49,120.49a12,12,0,0,1-17,0L168,185a92.12,92.12,0,1,1,17-17l47.54,47.53A12,12,0,0,1,232.49,232.49ZM112,180a68,68,0,1,0-68-68A68.08,68.08,0,0,0,112,180Z"/></symbol><symbol id="i-bold-paper-plane-tilt" viewBox="0 0 256 256"><path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z"/></symbol><symbol id="i-bold-phone-call" viewBox="0 0 256 256"><path d="M140.41,44.9a12,12,0,0,1,14.69-8.49,90.12,90.12,0,0,1,64.49,64.49,12,12,0,1,1-23.18,6.2A66.42,66.42,0,0,0,148.9,59.59,12,12,0,0,1,140.41,44.9Zm87.44,138.68A60.27,60.27,0,0,1,168,236C86.39,236,20,169.61,20,88A60.27,60.27,0,0,1,72.42,28.15,20.05,20.05,0,0,1,93.2,40l21.11,47.13a1.42,1.42,0,0,0,.08.18,20,20,0,0,1-1.66,18.83,10.67,10.67,0,0,1-.85,1.15L92.82,130c7.06,12.84,20.5,26.16,33.49,33.21l22.31-19a13.08,13.08,0,0,1,1.12-.84,19.91,19.91,0,0,1,19-1.74l.18.08L216,162.8A20.06,20.06,0,0,1,227.85,183.58Zm-24.31-.06-42-18.81-22.43,19.07a11.63,11.63,0,0,1-1.11.85A20,20,0,0,1,118.31,186c-19.48-9.4-38.89-28.68-48.31-48a20,20,0,0,1,1.28-19.64,10.75,10.75,0,0,1,.86-1.15L91.3,94.49l-18.82-42A36.29,36.29,0,0,0,44,88,124.15,124.15,0,0,0,168,212,36.29,36.29,0,0,0,203.54,183.52ZM137.63,97.47a32,32,0,0,1,20.9,20.9,12,12,0,0,0,11.44,8.4,12.22,12.22,0,0,0,3.61-.55,12,12,0,0,0,7.84-15,56,56,0,0,0-36.59-36.59,12,12,0,1,0-7.2,22.89Z"/></symbol><symbol id="i-bold-seal-check" viewBox="0 0 256 256"><path d="M228.75,100.05c-3.52-3.67-7.15-7.46-8.34-10.33-1.06-2.56-1.14-7.83-1.21-12.47-.15-10-.34-22.44-9.18-31.27s-21.27-9-31.27-9.18c-4.64-.07-9.91-.15-12.47-1.21-2.87-1.19-6.66-4.82-10.33-8.34C148.87,20.46,140.05,12,128,12s-20.87,8.46-27.95,15.25c-3.67,3.52-7.46,7.15-10.33,8.34-2.56,1.06-7.83,1.14-12.47,1.21C67.25,37,54.81,37.14,46,46S37,67.25,36.8,77.25c-.07,4.64-.15,9.91-1.21,12.47-1.19,2.87-4.82,6.66-8.34,10.33C20.46,107.13,12,116,12,128S20.46,148.87,27.25,156c3.52,3.67,7.15,7.46,8.34,10.33,1.06,2.56,1.14,7.83,1.21,12.47.15,10,.34,22.44,9.18,31.27s21.27,9,31.27,9.18c4.64.07,9.91.15,12.47,1.21,2.87,1.19,6.66,4.82,10.33,8.34C107.13,235.54,116,244,128,244s20.87-8.46,27.95-15.25c3.67-3.52,7.46-7.15,10.33-8.34,2.56-1.06,7.83-1.14,12.47-1.21,10-.15,22.44-.34,31.27-9.18s9-21.27,9.18-31.27c.07-4.64.15-9.91,1.21-12.47,1.19-2.87,4.82-6.66,8.34-10.33C235.54,148.87,244,140.05,244,128S235.54,107.13,228.75,100.05Zm-17.32,39.29c-4.82,5-10.28,10.72-13.19,17.76-2.82,6.8-2.93,14.16-3,21.29-.08,5.36-.19,12.71-2.15,14.66s-9.3,2.07-14.66,2.15c-7.13.11-14.49.22-21.29,3-7,2.91-12.73,8.37-17.76,13.19C135.78,214.84,130.4,220,128,220s-7.78-5.16-11.34-8.57c-5-4.82-10.72-10.28-17.76-13.19-6.8-2.82-14.16-2.93-21.29-3-5.36-.08-12.71-.19-14.66-2.15s-2.07-9.3-2.15-14.66c-.11-7.13-.22-14.49-3-21.29-2.91-7-8.37-12.73-13.19-17.76C41.16,135.78,36,130.4,36,128s5.16-7.78,8.57-11.34c4.82-5,10.28-10.72,13.19-17.76,2.82-6.8,2.93-14.16,3-21.29C60.88,72.25,61,64.9,63,63s9.3-2.07,14.66-2.15c7.13-.11,14.49-.22,21.29-3,7-2.91,12.73-8.37,17.76-13.19C120.22,41.16,125.6,36,128,36s7.78,5.16,11.34,8.57c5,4.82,10.72,10.28,17.76,13.19,6.8,2.82,14.16,2.93,21.29,3,5.36.08,12.71.19,14.66,2.15s2.07,9.3,2.15,14.66c.11,7.13.22,14.49,3,21.29,2.91,7,8.37,12.73,13.19,17.76,3.41,3.56,8.57,8.94,8.57,11.34S214.84,135.78,211.43,139.34ZM176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51Z"/></symbol><symbol id="i-bold-sparkle" viewBox="0 0 256 256"><path d="M199,125.31l-49.88-18.39L130.69,57a19.92,19.92,0,0,0-37.38,0L74.92,106.92,25,125.31a19.92,19.92,0,0,0,0,37.38l49.88,18.39L93.31,231a19.92,19.92,0,0,0,37.38,0l18.39-49.88L199,162.69a19.92,19.92,0,0,0,0-37.38Zm-63.38,35.16a12,12,0,0,0-7.11,7.11L112,212.28l-16.47-44.7a12,12,0,0,0-7.11-7.11L43.72,144l44.7-16.47a12,12,0,0,0,7.11-7.11L112,75.72l16.47,44.7a12,12,0,0,0,7.11,7.11L180.28,144ZM140,40a12,12,0,0,1,12-12h12V16a12,12,0,0,1,24,0V28h12a12,12,0,0,1,0,24H188V64a12,12,0,0,1-24,0V52H152A12,12,0,0,1,140,40ZM252,88a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4V72a12,12,0,0,1,24,0v4h4A12,12,0,0,1,252,88Z"/></symbol><symbol id="i-bold-star" viewBox="0 0 256 256"><path d="M243,96a20.33,20.33,0,0,0-17.74-14l-56.59-4.57L146.83,24.62a20.36,20.36,0,0,0-37.66,0L87.35,77.44,30.76,82A20.45,20.45,0,0,0,19.1,117.88l43.18,37.24-13.2,55.7A20.37,20.37,0,0,0,79.57,233L128,203.19,176.43,233a20.39,20.39,0,0,0,30.49-22.15l-13.2-55.7,43.18-37.24A20.43,20.43,0,0,0,243,96ZM172.53,141.7a12,12,0,0,0-3.84,11.86L181.58,208l-47.29-29.08a12,12,0,0,0-12.58,0L74.42,208l12.89-54.4a12,12,0,0,0-3.84-11.86L41.2,105.24l55.4-4.47a12,12,0,0,0,10.13-7.38L128,41.89l21.27,51.5a12,12,0,0,0,10.13,7.38l55.4,4.47Z"/></symbol><symbol id="i-bold-tiktok-logo" viewBox="0 0 256 256"><path d="M224,68a44.05,44.05,0,0,1-44-44,12,12,0,0,0-12-12H128a12,12,0,0,0-12,12V156a16,16,0,1,1-22.85-14.47A12,12,0,0,0,100,130.69V88A12,12,0,0,0,85.9,76.19a79.35,79.35,0,0,0-47.08,27.74A81.84,81.84,0,0,0,20,156a80,80,0,0,0,160,0V122.67A107.47,107.47,0,0,0,224,132a12,12,0,0,0,12-12V80A12,12,0,0,0,224,68Zm-12,39.15a83.05,83.05,0,0,1-37-14.91A12,12,0,0,0,156,102v54a56,56,0,0,1-112,0,57.86,57.86,0,0,1,32-51.56V124a40,40,0,1,0,64,32V36h17.06A68.21,68.21,0,0,0,212,90.94Z"/></symbol><symbol id="i-bold-whatsapp-logo" viewBox="0 0 256 256"><path d="M187.3,159.06A36.09,36.09,0,0,1,152,188a84.09,84.09,0,0,1-84-84A36.09,36.09,0,0,1,96.94,68.7,12,12,0,0,1,110,75.1l11.48,23a12,12,0,0,1-.75,12l-8.52,12.78a44.56,44.56,0,0,0,20.91,20.91l12.78-8.52a12,12,0,0,1,12-.75l23,11.48A12,12,0,0,1,187.3,159.06ZM236,128A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"/></symbol><symbol id="i-bold-x" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"/></symbol><symbol id="i-fill-quotes" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"/></symbol><symbol id="i-fill-star" viewBox="0 0 256 256"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"/></symbol></svg>

<header style="position:sticky;top:0;z-index:60;background:rgba(255,255,255,.97);border-bottom:1px solid #E3ECF3">
  <div id="gcs-progress" aria-hidden="true" style="position:absolute;left:0;bottom:-1px;height:2px;width:100%;transform:scaleX(0);transform-origin:0 50%;background:linear-gradient(90deg,#00A9E0,#D42A80)"></div>
  <div style="max-width:1240px;margin:0 auto;padding:0 24px;height:74px;display:flex;align-items:center;gap:28px">
    <a href="#top" style="display:flex;align-items:center;gap:12px;text-decoration:none;flex:0 0 auto">
      <img src="/assets/gcs-badge-96.webp" alt="Genesis Cleaning Service LLC logo" width="46" height="46" fetchpriority="high" decoding="async" style="width:46px;height:46px;border-radius:50%;box-shadow:0 3px 12px rgba(11,30,78,.2)">
      <span style="display:flex;flex-direction:column;gap:3px">
        <span style="font-family:Outfit,sans-serif;font-weight:700;font-size:15px;line-height:1;color:#0B1E4E;letter-spacing:.01em">Genesis Cleaning Service</span>
        <span style="font-size:9.5px;font-weight:700;letter-spacing:.22em;color:#007AA8;line-height:1">LLC</span>
      </span>
    </a>

    <nav data-desk="1" aria-label="Main" style="display:flex;align-items:center;gap:26px;margin-left:auto">
      <a href="#top" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.home">Home</a>
      <a href="#services" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.services">Services</a>
      <a href="#why" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.why">Why GCS</a>
      <a href="#contact" data-navlink="1" style="font-size:14.5px;font-weight:600;color:#2A3A60" data-i18n="nav.contact">Contact</a>
    </nav>

    <div data-desk="1" style="display:flex;align-items:center;gap:14px">
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:flex;align-items:center;background:#EFF5F9;border-radius:999px;padding:3px">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:3px;bottom:3px;left:3px;width:calc(50% - 3px);border-radius:999px;background:#0B1E4E"></span>
        <button type="button" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:7px 13px;border-radius:999px;background:transparent;color:#fff;transition:color .32s ease">EN</button>
        <button type="button" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:7px 13px;border-radius:999px;background:transparent;color:#56658A;transition:color .32s ease">ES</button>
      </div>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:9px;background:#D42A80;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 18px rgba(212,42,128,.32);transition:transform .18s ease, box-shadow .18s ease" style-hover="transform:translateY(-1px);box-shadow:0 10px 24px rgba(212,42,128,.4)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:17px;height:17px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
      </a>
    </div>

    <button type="button" id="gcs-burger" data-mob="1" data-action="toggleNav" aria-expanded="false" aria-controls="gcs-mobnav" data-i18n-aria="a11y.menu" aria-label="Open menu" style="margin-left:auto;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;border:1px solid #DCE7F0;background:#fff;color:#0B1E4E;cursor:pointer">
      <svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-list"/></svg>
    </button>
  </div>

  <div id="gcs-mobnav" style="display:none;border-top:1px solid #E3ECF3;background:#fff;padding:18px 24px 24px">
    <nav aria-label="Mobile" style="display:flex;flex-direction:column;gap:2px">
      <a href="#top" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.home">Home</a>
      <a href="#services" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.services">Services</a>
      <a href="#why" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.why">Why GCS</a>
      <a href="#contact" data-action="closeNav" style="font-size:17px;font-weight:600;color:#0B1E4E;padding:12px 0;border-bottom:1px solid #EEF4F8" data-i18n="nav.contact">Contact</a>
    </nav>
    <div style="display:flex;align-items:center;gap:12px;margin-top:20px">
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:flex;align-items:center;background:#EFF5F9;border-radius:999px;padding:4px">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:#0B1E4E"></span>
        <button type="button" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;padding:9px 16px;border-radius:999px;background:transparent;color:#fff;transition:color .32s ease">EN</button>
        <button type="button" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;padding:9px 16px;border-radius:999px;background:transparent;color:#56658A;transition:color .32s ease">ES</button>
      </div>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" data-action="closeNav" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:9px;background:#D42A80;color:#fff;font-weight:700;font-size:15px;padding:14px 18px;border-radius:999px">
        <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
      </a>
    </div>
  </div>
</header>

<main>

<section aria-labelledby="hero-h" style="position:relative;overflow:hidden;background:linear-gradient(178deg,#FFFFFF 0%,#F3FAFD 58%,#EAF6FC 100%)">
  <div aria-hidden="true" data-blob="1" style="position:absolute;top:-180px;right:-140px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(0,169,224,.20),rgba(0,169,224,0) 68%)"></div>
  <div aria-hidden="true" data-blob="-1" style="position:absolute;bottom:-220px;left:-160px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle at 50% 50%,rgba(212,42,128,.13),rgba(212,42,128,0) 70%)"></div>

  <div data-split="1" style="position:relative;max-width:1240px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px clamp(56px,7vw,96px);display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(32px,4vw,64px);align-items:center">
    <div>
      <p data-anim="eyebrow" style="display:inline-flex;align-items:center;gap:9px;margin:0 0 22px;background:#fff;border:1px solid #CFE9F5;color:#0B4A63;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(11,30,78,.06)">
        <svg class="gi" aria-hidden="true" style="width:16px;height:16px;color:#00A9E0"><use href="#i-bold-chats-circle"/></svg>Aquí se habla español
      </p>
      <h1 id="hero-h" data-anim="h1" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(38px,5.4vw,66px);line-height:1.04;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 20px;text-wrap:balance">
        <span data-i18n="hero.h1a">Professional cleaning</span> <span style="color:#007AA8" data-i18n="hero.h1b">you can trust</span>
      </h1>
      <p data-anim="sub" style="font-size:clamp(16.5px,1.5vw,19px);line-height:1.6;color:#4A5A7D;max-width:52ch;margin:0 0 32px" data-i18n="hero.sub">Reliable residential and commercial cleaning for homes and businesses across New Jersey, with attention to the details that make the difference.</p>
      <div data-anim="cta" style="display:flex;flex-wrap:wrap;gap:14px">
        <a data-wa="1" data-cta-solid="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:11px;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px;white-space:nowrap;box-shadow:0 10px 26px rgba(212,42,128,.34);transition:box-shadow .18s ease" data-tilt="1" style-hover="transform:translateY(-2px);box-shadow:0 14px 32px rgba(212,42,128,.42)" style-active="transform:translateY(1px)">
          <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-whatsapp-logo"/></svg><span data-i18n="cta.quote">Get a Free Quote</span>
        </a>
        <a href="tel:+19083383160" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;border:1.5px solid #C9DCEA;font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px;white-space:nowrap;transition:border-color .18s ease" data-tilt="1" style-hover="border-color:#00A9E0;transform:translateY(-2px)" style-active="transform:translateY(1px)">
          <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.call">Call (908) 338-3160</span>
        </a>
      </div>
    </div>

    <div style="position:relative">
      <div aria-hidden="true" style="position:absolute;inset:26px -22px -26px 26px;border-radius:32px;background:linear-gradient(140deg,#00A9E0,#7FE0F5 55%,#E8368F);opacity:.16"></div>
      <div data-anim="img" data-vel="1" style="position:relative;border-radius:26px;overflow:hidden;background:#EAF4FA;box-shadow:0 26px 60px rgba(11,30,78,.16);border:1px solid #DCEBF4;aspect-ratio:4/3.35;min-height:300px">
        <img src="/assets/gcs-hero-1034.webp" srcset="/assets/gcs-hero-480.webp 480w, /assets/gcs-hero-768.webp 768w, /assets/gcs-hero-1034.webp 1034w" sizes="(max-width:1024px) 92vw, 46vw" alt="Bright, freshly cleaned home interior in New Jersey" width="1034" height="776" fetchpriority="high" decoding="async" data-depth-image="1" style="width:100%;height:100%;object-fit:cover;display:block">
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="vals-h" style="background:#fff;border-top:1px solid #EBF2F7;border-bottom:1px solid #EBF2F7">
  <h2 id="vals-h" class="gcs-sr" data-i18n="val.h2">What we stand for</h2>
  <div style="max-width:1240px;margin:0 auto;padding:clamp(34px,4vw,52px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:clamp(24px,3vw,44px)">
    <div data-val="0">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-seal-check"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.1.t">Professional</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.1.b">A careful, consistent process on every job, residential or commercial.</p>
    </div>
    <div data-val="1">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-handshake"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.2.t">Trust</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.2.b">Clear communication before, during and after the work is done.</p>
    </div>
    <div data-val="2">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-sparkle"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.3.t">Quality</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.3.b">We finish a space when it looks the way we would want our own to look.</p>
    </div>
    <div data-val="3">
      <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#E8368F"><use href="#i-bold-magnifying-glass-plus"/></svg>
      <h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:12px 0 7px" data-i18n="val.4.t">Attention to detail</h3>
      <p style="font-size:14.5px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="val.4.b">Los detalles hacen la diferencia. The corners, edges and surfaces that usually get missed.</p>
    </div>
  </div>
</section>

<section id="services" aria-labelledby="services-h" style="background:#FBFDFE">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(64px,8vw,110px) 24px">
    <p data-reveal="0" style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#007AA8;margin:0 0 14px" data-i18n="svc.eyebrow">Our services</p>
    <h2 id="services-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 clamp(32px,4vw,52px);max-width:16ch;text-wrap:balance" data-i18n="svc.h2">Four ways we keep a space clean</h2>

    <div data-bento="1" style="display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:18px">
      <article data-reveal="0" style="grid-row:span 2;display:flex;flex-direction:column;justify-content:space-between;gap:28px;padding:clamp(26px,3vw,38px);border-radius:22px;background:linear-gradient(165deg,#E7F7FD 0%,#F7FCFE 62%,#FFFFFF 100%);border:1px solid #D3EBF6;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:58px;height:58px;border-radius:18px;background:#fff;box-shadow:0 6px 18px rgba(0,169,224,.22)">
          <svg class="gi" aria-hidden="true" style="width:28px;height:28px;color:#00A9E0"><use href="#i-bold-house-line"/></svg>
        </div>
        <div>
          <h3 style="font-family:Outfit,sans-serif;font-size:clamp(21px,2.2vw,26px);font-weight:700;color:#0B1E4E;margin:0 0 12px" data-i18n="svc.1.t">Residential Cleaning</h3>
          <p style="font-size:15.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="svc.1.b">Houses and apartments cleaned room by room: kitchens, bathrooms, floors and living areas, on the schedule that fits your week.</p>
        </div>
      </article>

      <article data-reveal="80" style="padding:clamp(24px,2.6vw,30px);border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-buildings"/></svg>
        <h3 style="font-family:Outfit,sans-serif;font-size:19px;font-weight:700;color:#0B1E4E;margin:16px 0 10px" data-i18n="svc.2.t">Commercial Cleaning</h3>
        <p style="font-size:15px;line-height:1.6;color:#5A6A8C;margin:0" data-i18n="svc.2.b">Offices, retail and shared spaces kept presentable for your team and your customers, cleaned around your hours.</p>
      </article>

      <article data-reveal="150" style="padding:clamp(24px,2.6vw,30px);border-radius:22px;background:#fff;border:1px solid #E3ECF3;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <svg class="gi" aria-hidden="true" style="width:26px;height:26px;color:#00A9E0"><use href="#i-bold-hard-hat"/></svg>
        <h3 style="font-family:Outfit,sans-serif;font-size:19px;font-weight:700;color:#0B1E4E;margin:16px 0 10px" data-i18n="svc.3.t">Construction Cleaning</h3>
        <p style="font-size:15px;line-height:1.6;color:#5A6A8C;margin:0" data-i18n="svc.3.b">Post construction and post renovation cleanup: dust, debris and residue removed so the space is ready to hand over.</p>
      </article>

      <article data-reveal="220" style="grid-column:span 2;display:flex;align-items:center;gap:clamp(20px,2.4vw,32px);flex-wrap:wrap;padding:clamp(24px,2.6vw,32px);border-radius:22px;background:linear-gradient(110deg,#FFF2F8 0%,#FFFFFF 70%);border:1px solid #F6D8E7;transition:transform .22s ease,box-shadow .22s ease" style-hover="transform:translateY(-4px);box-shadow:0 20px 44px rgba(11,30,78,.12)">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:18px;background:#fff;box-shadow:0 6px 18px rgba(212,42,128,.2);flex:0 0 auto">
          <svg class="gi" aria-hidden="true" style="width:27px;height:27px;color:#E8368F"><use href="#i-bold-app-window"/></svg>
        </div>
        <div style="flex:1 1 260px">
          <h3 style="font-family:Outfit,sans-serif;font-size:19px;font-weight:700;color:#0B1E4E;margin:0 0 10px" data-i18n="svc.4.t">Window Cleaning</h3>
          <p style="font-size:15px;line-height:1.6;color:#5A6A8C;margin:0" data-i18n="svc.4.b">Interior and exterior glass cleaned streak free, so the natural light comes through the way it should.</p>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="why" aria-labelledby="why-h" style="background:#fff;border-top:1px solid #EBF2F7">
  <div data-split="1" style="max-width:1240px;margin:0 auto;padding:clamp(64px,8vw,110px) 24px;display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(36px,5vw,72px);align-items:start">
    <div>
      <h2 id="why-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 20px;text-wrap:balance" data-i18n="why.h2">Why people call Genesis back</h2>
      <p style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:0 0 28px;max-width:40ch" data-i18n="why.sub">GCS is built around one idea, the one written on our logo: los detalles hacen la diferencia.</p>
      <div data-clip="1" data-vel="1" style="position:relative;border-radius:22px;overflow:hidden;border:1px solid #DCEBF4;background:#EAF4FA;aspect-ratio:4/3;box-shadow:0 18px 44px rgba(11,30,78,.1)">
        <img src="/assets/gcs-why-948.webp" srcset="/assets/gcs-why-480.webp 480w, /assets/gcs-why-768.webp 768w, /assets/gcs-why-948.webp 948w" sizes="(max-width:1024px) 92vw, 46vw" alt="Genesis Cleaning Service team at work on a residential job" width="948" height="711" loading="lazy" decoding="async" data-depth-image="1" style="width:100%;height:100%;object-fit:cover;display:block">
      </div>
    </div>

    <ul style="list-style:none;margin:0;padding:0;display:grid;gap:14px">
      <li data-reveal="0" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-magnifying-glass-plus"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.1.t">Attention to detail</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.1.b">The finish is judged on the parts most people skip: baseboards, tracks, handles, edges.</p></div>
      </li>
      <li data-reveal="60" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-buildings"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.2.t">Homes and businesses</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.2.b">One team for your house, your office and the job site after construction.</p></div>
      </li>
      <li data-reveal="120" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-chats-circle"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.3.t">Bilingual service</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.3.b">English or Spanish, whichever you are most comfortable speaking.</p></div>
      </li>
      <li data-reveal="180" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-phone-call"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.4.t">Direct communication</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.4.b">Call or send a WhatsApp message and talk with the people who do the work.</p></div>
      </li>
      <li data-reveal="240" style="display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;background:#FBFDFE;border:1px solid #E8EFF5">
        <svg class="gi" aria-hidden="true" style="width:21px;height:21px;color:#00A9E0;flex:0 0 auto;margin-top:2px"><use href="#i-bold-seal-check"/></svg>
        <div><h3 style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#0B1E4E;margin:0 0 6px" data-i18n="why.5.t">Professional presentation</h3><p style="font-size:15px;line-height:1.55;color:#5A6A8C;margin:0" data-i18n="why.5.b">We arrive prepared, work carefully around your things and leave the space ready to use.</p></div>
      </li>
    </ul>
  </div>
</section>

<section id="reviews" aria-labelledby="rev-h" style="background:linear-gradient(180deg,#F4FAFD 0%,#FFFFFF 72%);border-top:1px solid #E2EFF5;overflow:hidden">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(60px,7vw,100px) 24px 0">
    <p data-reveal="0" style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#007AA8;margin:0 0 14px" data-i18n="rev.eyebrow">Testimonials</p>
    <h2 id="rev-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.02em;color:#0B1E4E;margin:0 0 18px;max-width:20ch;text-wrap:balance" data-i18n="rev.h2">What people say about us</h2>
    <span data-reveal="0" aria-hidden="true" style="display:block;width:64px;height:4px;border-radius:2px;background:#00A9E0"></span>
    <p data-reveal="0" style="font-size:16.5px;line-height:1.62;color:#4A5A7D;margin:20px 0 0;max-width:56ch" data-i18n="rev.sub">Homes, offices and job sites we have cleaned.</p>
  </div>

  <div data-marq-wrap="1" style="position:relative;margin-top:clamp(34px,4vw,48px);padding:6px 0 4px">
    <div id="gcs-track" style="display:flex;gap:20px;width:max-content;padding:0 10px">
      <article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">They cleaned the whole apartment before we moved in. Even the window tracks were spotless, and booking took one WhatsApp message.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Yesenia M.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">We use GCS every two weeks for the office. Always on time, and the kitchen and bathrooms are ready before staff arrive.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Daniel R.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Después de la remodelación había polvo por todas partes. Lo dejaron impecable en un solo día.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Carla V.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Careful work on the hardwood floors and baseboards. They moved furniture back exactly where it was.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Michael T.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Limpiaron las ventanas por dentro y por fuera. Ahora entra muchísima más luz en la casa.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Rosa E.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Straightforward quote, no surprises, and the team was easy to talk to throughout the job.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Priya N.</p>
            </div>
          </article>
      <article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">They cleaned the whole apartment before we moved in. Even the window tracks were spotless, and booking took one WhatsApp message.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Yesenia M.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">We use GCS every two weeks for the office. Always on time, and the kitchen and bathrooms are ready before staff arrive.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Daniel R.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Después de la remodelación había polvo por todas partes. Lo dejaron impecable en un solo día.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Carla V.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Careful work on the hardwood floors and baseboards. They moved furniture back exactly where it was.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Michael T.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Limpiaron las ventanas por dentro y por fuera. Ahora entra muchísima más luz en la casa.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:100%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Rosa E.</p>
            </div>
          </article><article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">Straightforward quote, no surprises, and the team was easy to talk to throughout the job.</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="4.5 / 5" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:90%">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">Priya N.</p>
            </div>
          </article>
    </div>
  </div>

  <div style="max-width:1240px;margin:0 auto;padding:clamp(36px,4vw,52px) 24px clamp(60px,7vw,96px);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px;text-align:center">
    <p style="font-size:16.5px;line-height:1.6;color:#4A5A7D;margin:0" data-i18n="rev.prompt">Have we cleaned for you?</p>
    <button type="button" data-action="openModal" data-tilt="1" data-cta-solid="1" style="display:inline-flex;align-items:center;gap:10px;border:0;cursor:pointer;font-family:Manrope,sans-serif;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:16px 28px;border-radius:999px;box-shadow:0 10px 26px rgba(212,42,128,.32)">
      <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-star"/></svg><span data-i18n="rev.leave">Leave a review</span>
    </button>
  </div>
</section>

<section aria-labelledby="es-h" style="background:linear-gradient(160deg,#0A1A45 0%,#071336 62%,#0C2456 100%);position:relative;overflow:hidden">
  <div data-glow="1" aria-hidden="true" style="position:absolute;top:-140px;right:-100px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(0,169,224,.28),rgba(0,169,224,0) 68%)"></div>
  <div data-split="1" style="position:relative;max-width:1240px;margin:0 auto;padding:clamp(60px,7vw,100px) 24px;display:grid;grid-template-columns:.72fr 1.28fr;gap:clamp(32px,4.5vw,64px);align-items:center">
    <img data-badge="1" src="/assets/gcs-badge-560.webp" srcset="/assets/gcs-badge-280.webp 280w, /assets/gcs-badge-560.webp 560w" sizes="280px" width="560" height="560" loading="lazy" decoding="async" alt="Genesis Cleaning Service LLC brand seal: los detalles hacen la diferencia" style="width:100%;max-width:280px;height:auto;border-radius:50%;justify-self:center;box-shadow:0 24px 60px rgba(0,0,0,.4)">
    <div data-reveal="0">
      <h2 id="es-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(32px,4.2vw,54px);line-height:1.05;letter-spacing:-.02em;color:#fff;margin:0 0 20px">Aquí se habla <span style="color:#4FD3F5">español</span></h2>
      <p style="font-size:clamp(16px,1.5vw,18.5px);line-height:1.65;color:#C7D6EE;margin:0 0 16px;max-width:56ch" data-i18n="es.p1">Llámanos o escríbenos por WhatsApp en español. Te atendemos en español desde la primera pregunta hasta el último detalle del trabajo.</p>
      <p style="font-size:15.5px;line-height:1.65;color:#8FA5CC;margin:0 0 30px;max-width:56ch" data-i18n="es.p2">Ask for a quote in Spanish, explain what your space needs in Spanish, and get your answer in Spanish. No translation app in the middle.</p>
      <a data-wa="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px" style-hover="transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.32)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#0B9E5B"><use href="#i-bold-whatsapp-logo"/></svg><span data-i18n="es.cta">Escríbenos por WhatsApp</span>
      </a>
    </div>
  </div>
</section>

<section aria-labelledby="cta-h" style="background:#0A1A45;border-top:1px solid rgba(255,255,255,.08)">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(56px,6vw,88px) 24px;text-align:center">
    <h2 id="cta-h" style="font-family:Outfit,sans-serif;font-weight:800;font-size:clamp(30px,3.8vw,48px);line-height:1.08;letter-spacing:-.02em;color:#fff;margin:0 0 14px" data-i18n="cta.h2">Ready for a cleaner space?</h2>
    <p data-reveal="0" style="font-size:16.5px;line-height:1.6;color:#A9BEDF;margin:0 auto 34px;max-width:48ch" data-i18n="cta.sub">Tell us about your home, office or job site and we will get you a quote.</p>
    <div data-reveal="0" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
      <a href="tel:+19083383160" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#fff;color:#0B1E4E;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px" style-hover="transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.callshort">Call</span>
      </a>
      <a data-wa="1" data-cta-solid="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:#D42A80;color:#fff;font-weight:700;font-size:16px;padding:17px 28px;border-radius:999px;box-shadow:0 10px 26px rgba(212,42,128,.36)" style-hover="transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-whatsapp-logo"/></svg>WhatsApp
      </a>
      <a href="mailto:service@gcscleaning.net" data-tilt="1" style="display:inline-flex;align-items:center;gap:11px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.34);font-weight:700;font-size:16px;padding:16px 26px;border-radius:999px;transition:border-color .18s ease" style-hover="border-color:#4FD3F5;transform:translateY(-2px)" style-active="transform:translateY(1px)">
        <svg class="gi" aria-hidden="true" style="width:19px;height:19px;color:#4FD3F5"><use href="#i-bold-envelope-simple"/></svg><span data-i18n="cta.email">Email</span>
      </a>
    </div>
  </div>
</section>

<section id="contact" aria-labelledby="contact-h" style="background:#0A1A45">
  <div style="max-width:1240px;margin:0 auto;padding:0 24px clamp(60px,7vw,96px)">
    <h2 id="contact-h" style="font-family:Outfit,sans-serif;font-weight:700;font-size:clamp(22px,2.4vw,28px);color:#fff;margin:0 0 28px;padding-top:12px" data-i18n="contact.h2">Contact Genesis Cleaning Service</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(238px,1fr));gap:16px">
      <a href="tel:+19083383160" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-phone-call"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.phone">Phone</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0">+1 (908) 338-3160</p>
      </a>
      <a href="mailto:service@gcscleaning.net" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-envelope-simple"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.email">Email</p>
        <p style="font-family:Outfit,sans-serif;font-size:16.5px;font-weight:700;color:#fff;margin:0;word-break:break-word">service@gcscleaning.net</p>
      </a>
      <div data-reveal="0" data-tilt="1" data-tilt-soft="1" style="padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)">
        <div style="display:flex;gap:10px;color:#4FD3F5">
          <svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-instagram-logo"/></svg>
          <svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-facebook-logo"/></svg>
          <svg class="gi" aria-hidden="true" style="width:22px;height:22px"><use href="#i-bold-tiktok-logo"/></svg>
        </div>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.social">Social</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0">@gcs.genesis</p>
      </div>
      <a href="https://www.gcscleaning.net" target="_blank" rel="noopener" data-reveal="0" data-tilt="1" data-tilt-soft="1" style="display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:background .2s ease,border-color .2s ease" style-hover="background:rgba(255,255,255,.09);border-color:rgba(79,211,245,.5)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-globe-simple"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.web">Website</p>
        <p style="font-family:Outfit,sans-serif;font-size:17px;font-weight:700;color:#fff;margin:0">www.gcscleaning.net</p>
      </a>
      <div data-reveal="0" data-tilt="1" data-tilt-soft="1" style="padding:24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)">
        <svg class="gi" aria-hidden="true" style="width:22px;height:22px;color:#4FD3F5"><use href="#i-bold-map-pin-area"/></svg>
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8FA5CC;margin:14px 0 7px" data-i18n="contact.area">Service area</p>
        <p style="font-family:Outfit,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0" data-i18n="contact.areaval">New Jersey</p>
      </div>
    </div>
  </div>
</section>

</main>

<footer style="background:#071336;color:#8FA5CC">
  <div style="max-width:1240px;margin:0 auto;padding:clamp(44px,5vw,64px) 24px 32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:36px;align-items:start">
    <div data-reveal="0">
      <img src="/assets/gcs-logo-navy-580.webp" srcset="/assets/gcs-logo-navy-290.webp 290w, /assets/gcs-logo-navy-580.webp 580w" sizes="290px" alt="Genesis Cleaning Service LLC" width="580" height="258" loading="lazy" decoding="async" style="width:100%;max-width:290px;height:auto;display:block;margin:0 0 16px">
      <p style="font-size:14.5px;line-height:1.6;margin:0;max-width:34ch" data-i18n="foot.tag">Professional cleaning, trust and quality for homes and businesses across New Jersey. Los detalles hacen la diferencia.</p>
    </div>
    <nav data-reveal="0" aria-label="Footer" style="display:flex;flex-direction:column;gap:11px">
      <a href="#top" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.home">Home</a>
      <a href="#services" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.services">Services</a>
      <a href="#why" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.why">Why GCS</a>
      <a href="#contact" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE" data-i18n="nav.contact">Contact</a>
    </nav>
    <div data-reveal="0" style="display:flex;flex-direction:column;gap:11px">
      <a href="tel:+19083383160" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">+1 (908) 338-3160</a>
      <a href="mailto:service@gcscleaning.net" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">service@gcscleaning.net</a>
      <a href="https://www.gcscleaning.net" target="_blank" rel="noopener" data-navlink="dark" style="font-size:14.5px;font-weight:600;color:#C7D6EE">www.gcscleaning.net</a>
      <p style="display:flex;align-items:center;gap:9px;font-size:14.5px;font-weight:600;color:#C7D6EE;margin:0">
        <svg class="gi" aria-hidden="true" style="width:17px;height:17px"><use href="#i-bold-instagram-logo"/></svg>
        <svg class="gi" aria-hidden="true" style="width:17px;height:17px"><use href="#i-bold-facebook-logo"/></svg>
        <svg class="gi" aria-hidden="true" style="width:17px;height:17px"><use href="#i-bold-tiktok-logo"/></svg>
        @gcs.genesis
      </p>
    </div>
    <div data-reveal="0">
      <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6C82AC;margin:0 0 12px" data-i18n="foot.lang">Language</p>
      <div role="group" data-i18n-aria="a11y.langgroup" aria-label="Language" style="position:relative;display:inline-flex;align-items:center;background:rgba(255,255,255,.08);border-radius:999px;padding:4px">
        <span data-knob="1" aria-hidden="true" style="position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:#ffffff"></span>
        <button type="button" data-lang-btn="en" data-action="setEn" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:8px 15px;border-radius:999px;background:transparent;color:#0B1E4E;transition:color .32s ease">EN</button>
        <button type="button" data-lang-btn="es" data-action="setEs" style="position:relative;z-index:1;border:0;cursor:pointer;font-family:Manrope,sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.06em;padding:8px 15px;border-radius:999px;background:transparent;color:#A9BEDF;transition:color .32s ease">ES</button>
      </div>
    </div>
  </div>
  <div style="max-width:1240px;margin:0 auto;padding:20px 24px 34px;border-top:1px solid rgba(255,255,255,.09)">
    <p style="font-size:13px;margin:0;color:#6C82AC"><span data-i18n="foot.copy">© 2026 Genesis Cleaning Service LLC. All rights reserved.</span></p>
  </div>
</footer>

<div id="rev-modal" role="dialog" aria-modal="true" aria-labelledby="rev-modal-h" style="display:none;position:fixed;inset:0;z-index:120;align-items:center;justify-content:center;padding:20px">
  <div data-action="closeModal" style="position:absolute;inset:0;background:rgba(7,19,54,.62);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)"></div>
  <form data-submit="submitReview" style="position:relative;width:100%;max-width:470px;max-height:88vh;overflow-y:auto;background:#fff;border-radius:24px;padding:clamp(26px,3vw,34px);box-shadow:0 30px 80px rgba(7,19,54,.42);display:grid;gap:18px">
    <div style="display:flex;align-items:flex-start;gap:16px">
      <h2 id="rev-modal-h" style="font-family:Outfit,sans-serif;font-size:23px;font-weight:700;color:#0B1E4E;margin:0;flex:1" data-i18n="rev.leave">Leave a review</h2>
      <button type="button" data-action="closeModal" data-i18n-aria="rev.close" aria-label="Close" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:12px;border:1px solid #DCE7F0;background:#fff;color:#0B1E4E;cursor:pointer">
        <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-x"/></svg>
      </button>
    </div>
    <div style="display:grid;gap:8px">
      <label for="rev-name" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.name">Your name</label>
      <input id="rev-name" name="name" type="text" maxlength="40" autoComplete="name" data-i18n-ph="rev.namePh" placeholder="Maria R." style="font-family:Manrope,sans-serif;font-size:15.5px;color:#12203F;padding:14px 16px;border:1.5px solid #6E93B4;border-radius:14px;background:#fff;width:100%">
    </div>
    <div style="display:grid;gap:8px">
      <span id="rev-rate-l" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.rating">Your rating</span>
      <div role="group" aria-labelledby="rev-rate-l" style="display:flex;gap:4px"><button type="button" data-star="1" data-action="setStar" aria-label="1" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="2" data-action="setStar" aria-label="2" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="3" data-action="setStar" aria-label="3" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="4" data-action="setStar" aria-label="4" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button><button type="button" data-star="5" data-action="setStar" aria-label="5" style="border:0;background:transparent;cursor:pointer;padding:4px;line-height:0"><svg class="gi" aria-hidden="true" style="width:30px;height:30px;color:#F5A623"><use href="#i-fill-star"/></svg></button></div>
    </div>
    <div style="display:grid;gap:8px">
      <label for="rev-text" style="font-size:13px;font-weight:700;color:#0B1E4E" data-i18n="rev.comment">Your review</label>
      <textarea id="rev-text" name="comment" rows="4" maxlength="500" data-i18n-ph="rev.commentPh" placeholder="Tell us how the cleaning went." style="font-family:Manrope,sans-serif;font-size:15.5px;line-height:1.55;color:#12203F;padding:14px 16px;border:1.5px solid #6E93B4;border-radius:14px;background:#fff;width:100%;resize:vertical"></textarea>
    </div>
    <div aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden">
      <label for="rev-website">Website</label>
      <input id="rev-website" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <p id="rev-msg" role="status" style="display:none;font-size:14px;line-height:1.5;margin:0;color:#B4225F"></p>
    <button type="submit" data-cta-solid="1" style="display:inline-flex;align-items:center;justify-content:center;gap:10px;border:0;cursor:pointer;font-family:Manrope,sans-serif;background:#D42A80;color:#fff;font-weight:700;font-size:15.5px;padding:16px 26px;border-radius:999px;box-shadow:0 8px 22px rgba(212,42,128,.3)">
      <svg class="gi" aria-hidden="true" style="width:18px;height:18px"><use href="#i-bold-paper-plane-tilt"/></svg><span data-i18n="rev.submit">Send review</span>
    </button>
    <p style="font-size:13px;line-height:1.5;color:#5A6A8C;margin:0" data-i18n="rev.note">Reviews are published after Genesis approves them. 8 to 80 words.</p>
  </form>
</div>

<div data-mobilebar="1" role="navigation" data-i18n-aria="a11y.quickcontact" aria-label="Quick contact" style="position:fixed;left:0;right:0;bottom:0;z-index:70;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#DCE7F0;border-top:1px solid #DCE7F0;box-shadow:0 -6px 22px rgba(11,30,78,.12)">
  <a href="tel:+19083383160" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#fff;color:#0B1E4E;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#00A9E0"><use href="#i-bold-phone-call"/></svg><span data-i18n="cta.callshort">Call</span>
  </a>
  <a data-wa="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#fff;color:#0B1E4E;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px;color:#0B9E5B"><use href="#i-bold-whatsapp-logo"/></svg>WhatsApp
  </a>
  <a data-wa="1" data-cta-solid="1" href="https://wa.me/19083383160" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#D42A80;color:#fff;padding:11px 6px;min-height:64px;font-size:12.5px;font-weight:700">
    <svg class="gi" aria-hidden="true" style="width:20px;height:20px"><use href="#i-bold-chat-circle-dots"/></svg><span data-i18n="cta.quoteshort">Quote</span>
  </a>
</div>

</div>`;
