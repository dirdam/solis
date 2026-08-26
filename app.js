        // --- i18n: per-app copy of the shared convention (see
        // all-my-games/.claude/skills/i18n-subpath-app.md) — deliberately
        // duplicated rather than loaded from a shared file, so this app never
        // depends on another app's deploy/cache state. The `dirdam-lang`
        // storage key and `lang` query param are shared BY CONVENTION with
        // every other app on this domain (localStorage is origin-scoped, not
        // path-scoped) — that's what keeps a language choice made here
        // consistent when navigating to /stocks or /timezones, with no
        // backend coordination. Adding a future language = one more entry in
        // SUPPORTED_LANGS, LANG_LABELS, MONTH_NAMES_BY_LANG, and every
        // STRINGS object below — no other code changes.
        const I18N_STORAGE_KEY = 'dirdam-lang';
        const SUPPORTED_LANGS = ['en', 'es', 'ja'];
        const LANG_LABELS = { en: 'EN', es: 'ES', ja: '日本語' };

        const STRINGS = {
            en: {
                tagline: "Earth from the Sun's point of view",
                introHtml: `Every map of Earth you've ever seen is drawn from Earth's own point of view. This project creates 
                    <strong>a dynamic projection of Earth where north points to the north ecliptic pole.</strong>`,
                textureGroupLabel: 'Earth texture',
                coordinatedMap: 'Coordinated map',
                realMap: 'Real map',
                view3dTitle: '3D view',
                resetView: 'Reset view',
                orbitAriaLabel: "Earth's position in its orbit around the Sun for the selected month",
                globeAriaLabel: "Draggable 3D globe showing Earth's axial tilt, with the night side dark",
                dragCaption: 'Drag the globe to look around',
                monthOfYear: 'Month of the year',
                hourOfDay: 'Hour of the day (UTC)',
                geocentricTitle: 'Geocentric projection',
                heliocentricTitle: 'Heliocentric projection',
                earthAriaLabel: "Earth from Earth's own view, with day and night shaded",
                rotatedAriaLabel: "Earth from the Sun's view",
                viewsShowTitle: 'What the views show',
                view3dText: `Earth rendered as an actual lit sphere: the night side is shaded dark, and a small marker
                    sits at the point on Earth's surface directly facing the Sun right now. Drag the globe to
                    look around — it starts facing the sunlit side, and the camera always stays level with the
                    plane the planets orbit in, so Earth's axial tilt reads as a lean rather than a bird's-eye
                    view. The orbit diagram beside it shows where Earth currently sits on its yearly path around
                    the Sun.`,
                geocentricText: `Earth shown the ordinary way, with Earth's own geographical north pole at the top — exactly
                    like the maps you already know. Moving the hour slider spins the map in place so the
                    meridian currently facing the Sun stays centered; the shaded night side and Sun marker track
                    the real day/night line and the point directly under the Sun for the selected month and hour.`,
                heliocentricText1: `This is the project's core idea: the same map of Earth, redrawn as if it were made from the
                    Sun's own point of view instead of Earth's. The Sun is always exactly at the center of this
                    map — that's not incidental, it's what the projection is built to guarantee.`,
                heliocentricText2Html: `Getting there takes three rotations. First, the map spins by the hour, so the meridian
                    currently facing the Sun sits at the front. Then it tilts by the current
                    <strong>declination</strong> — how far north or south of the equator the Sun sits directly
                    overhead, which depends on the month — so that exact point lands dead center. Finally, it
                    <strong>rolls</strong> sideways by an amount that keeps Earth's real 23.4° axial tilt fully
                    visible all year. Declination and roll are two faces of that one fixed tilt: declination
                    peaks at the solstices, when Earth leans fully toward or away from the Sun, and drops to
                    zero at the equinoxes — while roll does the exact opposite. So the tilt you see never
                    disappears, it just rotates direction as Earth moves around its orbit.`,
                seeMoreTools: 'See more tools',
                viewSource: 'View source',
                pauseLabel: 'Pause',
                playLabel: 'Play',
                sunLabel: 'Sun',
                marchEquinox: 'March equinox',
                juneSolstice: 'June solstice',
                septemberEquinox: 'September equinox',
                decemberSolstice: 'December solstice',
            },
            es: {
                tagline: 'La Tierra desde el punto de vista del Sol',
                introHtml: `Todos los mapas de la Tierra que has visto están dibujados desde el punto de vista de la propia Tierra.
                    Este proyecto crea <strong>una proyección dinámica de la Tierra donde el norte señala hacia el polo norte eclíptico.</strong>`,
                textureGroupLabel: 'Textura de la Tierra',
                coordinatedMap: 'Mapa coordinado',
                realMap: 'Mapa real',
                view3dTitle: 'Vista 3D',
                resetView: 'Restablecer vista',
                orbitAriaLabel: 'Posición de la Tierra en su órbita alrededor del Sol para el mes seleccionado',
                globeAriaLabel: 'Globo 3D interactivo que muestra la inclinación axial de la Tierra, con el lado nocturno oscurecido',
                dragCaption: 'Arrastra el globo para mirar alrededor',
                monthOfYear: 'Mes del año',
                hourOfDay: 'Hora del día (UTC)',
                geocentricTitle: 'Proyección geocéntrica',
                heliocentricTitle: 'Proyección heliocéntrica',
                earthAriaLabel: 'La Tierra desde su propio punto de vista, con el día y la noche sombreados',
                rotatedAriaLabel: 'La Tierra desde el punto de vista del Sol',
                viewsShowTitle: 'Qué muestran las vistas',
                view3dText: `La Tierra representada como una esfera realmente iluminada: el lado nocturno aparece sombreado, y un
                    pequeño marcador se sitúa en el punto de la superficie terrestre que mira directamente hacia el Sol en este momento.
                    Arrastra el globo para mirar alrededor — empieza orientado hacia el lado iluminado, y la cámara siempre se
                    mantiene al nivel del plano en que orbitan los planetas, de modo que la inclinación axial de la Tierra se percibe
                    como una inclinación lateral y no como una vista aérea. El diagrama de órbita junto a él muestra en qué punto de
                    su recorrido anual alrededor del Sol se encuentra la Tierra actualmente.`,
                geocentricText: `La Tierra representada de la forma habitual, con el polo norte geográfico de la Tierra en la parte
                    superior — igual que los mapas que ya conoces. Mover el control de la hora hace girar el mapa en su sitio para
                    que el meridiano que mira hacia el Sol permanezca centrado; el lado nocturno sombreado y el marcador del Sol
                    siguen la línea real de día y noche y el punto situado justo bajo el Sol para el mes y la hora seleccionados.`,
                heliocentricText1: `Esta es la idea central del proyecto: el mismo mapa de la Tierra, redibujado como si estuviera
                    hecho desde el propio punto de vista del Sol en lugar del de la Tierra. El Sol está siempre exactamente en el
                    centro de este mapa — eso no es casualidad, es justo lo que la proyección está diseñada para garantizar.`,
                heliocentricText2Html: `Llegar hasta ahí requiere tres rotaciones. Primero, el mapa gira según la hora, de modo que
                    el meridiano que mira hacia el Sol quede al frente. Luego se inclina según la <strong>declinación</strong> actual
                    — cuánto al norte o al sur del ecuador se sitúa el Sol justo encima, lo cual depende del mes — para que ese punto
                    exacto quede justo en el centro. Por último, <strong>rueda</strong> lateralmente en la medida necesaria para que
                    la inclinación axial real de la Tierra, de 23,4°, se mantenga siempre visible durante todo el año. La declinación
                    y el giro lateral son dos caras de esa misma inclinación fija: la declinación alcanza su máximo en los solsticios,
                    cuando la Tierra se inclina completamente hacia el Sol o en dirección contraria, y cae a cero en los equinoccios
                    — mientras que el giro lateral hace justo lo contrario. Así que la inclinación que se ve nunca desaparece,
                    simplemente cambia de dirección a medida que la Tierra avanza en su órbita.`,
                seeMoreTools: 'Ver más herramientas',
                viewSource: 'Ver código fuente',
                pauseLabel: 'Pausar',
                playLabel: 'Reproducir',
                sunLabel: 'Sol',
                marchEquinox: 'equinoccio de marzo',
                juneSolstice: 'solsticio de junio',
                septemberEquinox: 'equinoccio de septiembre',
                decemberSolstice: 'solsticio de diciembre',
            },
            ja: {
                tagline: '太陽から見た地球',
                introHtml: `これまで見てきた地球の地図はすべて、地球自身の視点から描かれています。このプロジェクトでは、
                    <strong>北が黄道北極を指す、地球の動的な投影図</strong>を作成します。`,
                textureGroupLabel: '地球のテクスチャ',
                coordinatedMap: '座標マップ',
                realMap: '実写マップ',
                view3dTitle: '3Dビュー',
                resetView: 'ビューをリセット',
                orbitAriaLabel: '選択した月における、太陽を周回する地球の軌道上の位置',
                globeAriaLabel: '地球の地軸の傾きを示す、ドラッグ可能な3D地球儀(夜側は暗く表示)',
                dragCaption: '地球儀をドラッグして視点を変える',
                monthOfYear: '月',
                hourOfDay: '時刻(UTC)',
                geocentricTitle: '地心図法',
                heliocentricTitle: '太陽中心図法',
                earthAriaLabel: '地球自身の視点から見た地球(昼夜を陰影で表示)',
                rotatedAriaLabel: '太陽から見た地球',
                viewsShowTitle: '各ビューが示すもの',
                view3dText: `地球を実際に光が当たった球体として描画します。夜側は暗く陰影がつき、現在太陽の方向を直接向いている
                    地表の地点には小さなマーカーが表示されます。地球儀をドラッグすると視点を変えられます — 最初は太陽の光が
                    当たる側を向いており、カメラは常に惑星が公転する平面と水平に保たれるため、地球の地軸の傾きは真上から見た
                    図ではなく、傾いた様子として見えます。隣にある軌道図は、地球が太陽の周りを回る年間の軌道上のどこに現在
                    位置しているかを示します。`,
                geocentricText: `地球を通常の方法で表示し、地球自身の地理的な北極を上にしています — すでに見慣れた地図と
                    まったく同じです。時刻のスライダーを動かすと、現在太陽の方向を向いている子午線が中心にとどまるように
                    地図がその場で回転します。陰影のついた夜側と太陽のマーカーは、選択した月と時刻における実際の昼夜の
                    境界線と太陽の直下点を追跡します。`,
                heliocentricText1: `これがこのプロジェクトの核となる発想です。同じ地球の地図を、地球ではなく太陽自身の視点から
                    作られたかのように描き直します。太陽は常にこの地図の正確な中心に位置します — これは偶然ではなく、
                    この投影法がまさに保証するように設計されているものです。`,
                heliocentricText2Html: `そこに至るには3つの回転が必要です。まず、地図は時刻に応じて回転し、現在太陽を向いている
                    子午線が正面に来るようにします。次に、現在の<strong>赤緯</strong> — 太陽が赤道の北または南にどれだけ
                    離れた真上に位置するか、月によって変化します — の分だけ傾き、その正確な地点が中心に来るようにします。
                    最後に、地球の実際の23.4°の地軸の傾きが年間を通じて常に見えるようにする量だけ横に<strong>回転(ロール)
                    </strong>します。赤緯とロールは、この一つの固定された傾きの二つの側面です。赤緯は、地球が太陽に向かって、
                    あるいは太陽から離れる方向に完全に傾く至点で最大になり、分点でゼロになります — 一方でロールはちょうど
                    その逆の動きをします。そのため、見えている傾きが消えることはなく、地球が軌道を進むにつれて向きが
                    回転していくだけなのです。`,
                seeMoreTools: '他のツールを見る',
                viewSource: 'ソースを見る',
                pauseLabel: '一時停止',
                playLabel: '再生',
                sunLabel: '太陽',
                marchEquinox: '春分',
                juneSolstice: '夏至',
                septemberEquinox: '秋分',
                decemberSolstice: '冬至',
            },
        };

        const MONTH_NAMES_BY_LANG = {
            en: ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'],
            es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            ja: ['1月', '2月', '3月', '4月', '5月', '6月',
                '7月', '8月', '9月', '10月', '11月', '12月'],
        };

        function detectInitialLang() {
            const urlLang = new URLSearchParams(location.search).get('lang');
            if (SUPPORTED_LANGS.includes(urlLang)) return urlLang;
            const stored = localStorage.getItem(I18N_STORAGE_KEY);
            if (SUPPORTED_LANGS.includes(stored)) return stored;
            const browserLang = (navigator.language || 'en').slice(0, 2);
            return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
        }

        let currentLang = detectInitialLang();
        const langChangeListeners = [];

        function getLang() { return currentLang; }

        function setLang(lang) {
            if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
            currentLang = lang;
            localStorage.setItem(I18N_STORAGE_KEY, lang);
            document.documentElement.lang = lang;
            applyStaticDict();
            langChangeListeners.forEach((fn) => fn(lang));
        }

        function onLangChange(fn) { langChangeListeners.push(fn); }

        function t(key) {
            return STRINGS[currentLang]?.[key] ?? STRINGS.en?.[key] ?? key;
        }

        function applyStaticDict() {
            document.querySelectorAll('[data-i18n-html]').forEach((el) => {
                el.innerHTML = t(el.getAttribute('data-i18n-html'));
            });
            document.querySelectorAll('[data-i18n]').forEach((el) => {
                const val = t(el.getAttribute('data-i18n'));
                const attr = el.getAttribute('data-i18n-attr');
                attr ? el.setAttribute(attr, val) : (el.textContent = val);
            });
        }

        const toggleContainer = document.getElementById('langToggle');
        function renderLangToggle() {
            toggleContainer.innerHTML = '';
            SUPPORTED_LANGS.forEach((lang) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = LANG_LABELS[lang] || lang.toUpperCase();
                btn.setAttribute('aria-label', `Switch language to ${lang}`);
                btn.setAttribute('aria-pressed', String(lang === getLang()));
                btn.addEventListener('click', () => setLang(lang));
                toggleContainer.appendChild(btn);
            });
        }
        onLangChange(renderLangToggle);

        // --- Shared math (mirrors the app's Python rotation model exactly) ------
        const AXIAL_TILT_DEG = 24; // Earth's real axial tilt — fixed, never changes with season

        // Solar declination (the Sun's apparent latitude) as a function of month,
        // approximated as a sine wave: 0 at the equinoxes (Mar/Sep), maxing out at
        // Earth's real ~23.4° axial tilt at the solstices (Jun/Dec). This is what
        // actually varies through the year — the axial tilt itself never does.
        function declinationForMonth(month) {
            return 23.4 * Math.sin((2 * Math.PI * (month - 3)) / 12);
        }

        // Earth's axial tilt has a fixed magnitude (23.4°) but its orientation
        // relative to the current Sun direction rotates over the year: at the
        // solstices it points fully toward/away from the Sun (that's declination,
        // above); at the equinoxes that component is zero, but the *same* 23.4° of
        // tilt is still there — it just shows up entirely as a sideways lean instead.
        // Declination and roll are the sin/cos parts of that one fixed-length tilt
        // vector, decomposed against the current Sun direction, so they're always
        // in quadrature (max roll when declination is 0, and vice versa).
        function rollForMonth(month) {
            return 23.4 * Math.cos((2 * Math.PI * (month - 3)) / 12);
        }

        function formatMonth(month) { return MONTH_NAMES_BY_LANG[currentLang][month - 1]; }

        function deg2rad(d) { return (d * Math.PI) / 180; }

        function rotationMatrixX(deg) {
            const a = deg2rad(deg), c = Math.cos(a), s = Math.sin(a);
            return [[1, 0, 0], [0, c, -s], [0, s, c]];
        }
        function rotationMatrixY(deg) {
            const a = deg2rad(deg), c = Math.cos(a), s = Math.sin(a);
            return [[c, 0, s], [0, 1, 0], [-s, 0, c]];
        }
        function rotationMatrixZ(deg) {
            const a = deg2rad(deg), c = Math.cos(a), s = Math.sin(a);
            return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
        }
        function matMul(a, b) {
            const out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
            return out;
        }
        function matVec(m, v) {
            return [
                m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
                m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
                m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
            ];
        }
        function transpose(m) {
            return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]];
        }
        function hourToZAngle(hour) {
            return (((12 - hour) * 15) % 360 + 360) % 360;
        }

        function formatHour(hour) {
            const h = Math.floor(hour) % 24;
            return `${String(h).padStart(2, '0')}:00`;
        }

        // --- Shared texture, loaded once and shared by all three views ---------
        // Two selectable sources: an illustrated equirectangular projection map
        // (default) and true-color satellite imagery. Switching just reloads this
        // shared texture and re-fires every view's already-registered render
        // callback below — no per-view wiring needed.
        let texData = null, texW = 0, texH = 0;
        let currentTextureSrc = 'projection';
        const onTextureReady = [];

        function loadTexture(src) {
            if (src) currentTextureSrc = src;
            const img = new Image();
            img.onload = () => {
                const off = document.createElement('canvas');
                off.width = img.width;
                off.height = img.height;
                const octx = off.getContext('2d');
                octx.drawImage(img, 0, 0);
                texData = octx.getImageData(0, 0, img.width, img.height).data;
                texW = img.width;
                texH = img.height;
                onTextureReady.forEach((fn) => fn());
            };
            img.onerror = () => {
                console.error('Failed to load texture:', img.src);
            };
            // This route only ever serves index.html at its own mount point (no
            // deeper static files), so the whole pathname IS the base dir — just
            // ensure it ends with "/". Stripping the last "/…" segment, as if it
            // might be a filename, breaks when the URL has no trailing slash
            // (e.g. a link to "/solis" instead of "/solis/"): that strips "solis"
            // itself and resolves the texture request against the domain root.
            const dir = window.location.pathname.endsWith('/')
                ? window.location.pathname
                : window.location.pathname + '/';
            img.src = dir + (currentTextureSrc === 'true' ? 'api/texture.png?src=true' : 'api/texture.png');
        }

        // --- Flat equirectangular views (Earth's-own-view and Sun's-eye view) --
        // Both are the same reprojection algorithm the app always used, just run
        // client-side now: an axial tilt plus an hour-dependent spin, resampled
        // into the same equirectangular grid. Rendering locally means the hour
        // slider redraws instantly with no network round-trip (and nothing to
        // accidentally cache stale, which is what caused the earlier blur bug).

        // Per-pixel unit-sphere coordinates for an equirectangular OUTPUT grid of a
        // given size — fixed layout, independent of hour/month/tilt.
        function computeSphereGrid(width, height) {
            const vx = new Float32Array(width * height);
            const vy = new Float32Array(width * height);
            const vz = new Float32Array(width * height);
            for (let y = 0; y < height; y++) {
                const lat = Math.PI / 2 - (y / (height - 1)) * Math.PI;
                const cosLat = Math.cos(lat), sinLat = Math.sin(lat);
                for (let x = 0; x < width; x++) {
                    const lon = -Math.PI + (x / (width - 1)) * (2 * Math.PI);
                    const i = y * width + x;
                    vx[i] = cosLat * Math.cos(lon);
                    vy[i] = cosLat * Math.sin(lon);
                    vz[i] = sinLat;
                }
            }
            return { vx, vy, vz };
        }

        // Reproject the texture through rotation R onto an equirectangular ImageData.
        function renderEquirectFrame(ctx, width, height, grid, R) {
            const Rt = transpose(R);
            const frame = ctx.createImageData(width, height);
            const out = frame.data;
            const { vx, vy, vz } = grid;

            for (let i = 0; i < width * height; i++) {
                const x = vx[i], y = vy[i], z = vz[i];
                const sx = Rt[0][0] * x + Rt[0][1] * y + Rt[0][2] * z;
                const sy = Rt[1][0] * x + Rt[1][1] * y + Rt[1][2] * z;
                const sz = Rt[2][0] * x + Rt[2][1] * y + Rt[2][2] * z;

                const lon = Math.atan2(sy, sx);
                const lat = Math.asin(Math.max(-1, Math.min(1, sz)));

                let tx = Math.floor(((lon + Math.PI) / (2 * Math.PI)) * texW) % texW;
                if (tx < 0) tx += texW;
                let ty = Math.floor(((Math.PI / 2 - lat) / Math.PI) * texH);
                if (ty < 0) ty = 0; else if (ty >= texH) ty = texH - 1;

                const ti = (ty * texW + tx) * 4;
                const oi = i * 4;
                out[oi] = texData[ti];
                out[oi + 1] = texData[ti + 1];
                out[oi + 2] = texData[ti + 2];
                out[oi + 3] = 255;
            }

            return frame;
        }

        function makeFlatView({ canvasId, buildR, postCanvas }) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const grid = computeSphereGrid(width, height);

            let hour = 12;
            let month = 6;

            function render() {
                if (!texData) return;
                const zAngle = hourToZAngle(hour);
                const R = buildR ? buildR(zAngle, month) : rotationMatrixZ(zAngle);

                const frame = renderEquirectFrame(ctx, width, height, grid, R);
                ctx.putImageData(frame, 0, 0);
                if (postCanvas) postCanvas(ctx, width, height);
            }

            onTextureReady.push(render);

            return {
                setHour(h) { hour = h; render(); },
                setMonth(m) { month = m; render(); },
            };
        }

        // Shared Sun icon (glow + solid disc), same style used by both flat maps.
        function drawSunGlyph(ctx, x, y, r) {
            ctx.fillStyle = 'rgba(255, 200, 80, 0.35)';
            ctx.beginPath();
            ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 176, 59, 1)';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Sun's-eye view: soft-edged circle marks the visible (sunlit) disc versus
        // the dimmed far side — a radial gradient gives the same soft terminator
        // look the day/night overlay uses, without needing a blur filter. The Sun
        // itself is always drawn dead center, because the rotation below is built
        // specifically to put the true current subsolar point there.
        function drawSunViewOverlay(ctx, width, height) {
            const cx = width / 2, cy = height / 2;
            const r = Math.min(width, height) / 2;
            const grad = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.12);
            grad.addColorStop(0, 'rgba(6, 21, 88, 0)');
            grad.addColorStop(1, 'rgba(6, 21, 88, 0.745)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            drawSunGlyph(ctx, cx, cy, height * 0.045);
        }

        // Three rotations, applied in this order (innermost/rightmost first):
        //   1. Rz(zAngle) spins the body so the meridian currently facing the Sun
        //      sits at longitude 0, without touching latitude (a Z-rotation can't
        //      change it) — so the subsolar point lands at (cos(dec), 0, sin(dec)).
        //   2. Ry(dec) rotates that exact point onto (1,0,0): the Sun is now dead
        //      center, for every month and hour — this never needs to be
        //      recomputed for the Sun icon, which is why it's just drawn at the
        //      canvas center in drawSunViewOverlay.
        //   3. Rx(roll) rotates everything else *around* that now-centered point
        //      (an X-axis rotation leaves (1,0,0) fixed, so the Sun stays put).
        //      This is what makes the rest of Earth — the pole, the grid — show
        //      its full 23.4° tilt year-round: at the solstices roll is 0 (the
        //      tilt is entirely captured by declination above), but at the
        //      equinoxes declination is 0 and the same fixed-magnitude tilt shows
        //      up entirely as this sideways lean instead.
        const sunView = makeFlatView({
            canvasId: 'rotatedCanvas',
            buildR: (zAngle, month) => matMul(
                rotationMatrixX(rollForMonth(month)),
                matMul(rotationMatrixY(declinationForMonth(month)), rotationMatrixZ(zAngle))
            ),
            postCanvas: drawSunViewOverlay,
        });

        // Earth's-own view: no tilt is applied here (it's always Earth's own,
        // north-up frame) — instead the month moves the Sun marker's latitude and
        // the night-side terminator, both driven by the same seasonal declination.
        // The night-alpha mask only depends on month, not hour, so it's cached and
        // only recomputed when the month actually changes.
        function makeNightAlpha(width, height, declinationDeg) {
            const alpha = new Float32Array(width * height);
            const decRad = deg2rad(declinationDeg);
            const sinDec = Math.sin(decRad), cosDec = Math.cos(decRad);
            // Widened to roughly match how far the Sun's-eye view's radial vignette
            // softens toward its edges — a narrower band read as noticeably sharper
            // than that view's blur for the same scene.
            const band = 24.0;
            const maxAlpha = 190 / 255;
            for (let y = 0; y < height; y++) {
                const latDeg = 90 - (y / (height - 1)) * 180;
                const latRad = deg2rad(latDeg);
                const sinLat = Math.sin(latRad), cosLat = Math.cos(latRad);
                for (let x = 0; x < width; x++) {
                    const lonDeg = -180 + (x / (width - 1)) * 360;
                    const sinElevation = sinDec * sinLat + cosDec * cosLat * Math.cos(deg2rad(lonDeg));
                    const elevationDeg = Math.asin(Math.max(-1, Math.min(1, sinElevation))) * 180 / Math.PI;
                    const nightAlpha = Math.max(0, Math.min(1, 0.5 - elevationDeg / band));
                    alpha[y * width + x] = nightAlpha * maxAlpha;
                }
            }
            return alpha;
        }

        function applyNightShade(out, width, height, nightAlpha) {
            for (let i = 0; i < width * height; i++) {
                const a = nightAlpha[i];
                if (a === 0) continue;
                const oi = i * 4;
                out[oi] = out[oi] * (1 - a) + 6 * a;
                out[oi + 1] = out[oi + 1] * (1 - a) + 21 * a;
                out[oi + 2] = out[oi + 2] * (1 - a) + 88 * a;
            }
        }

        function drawSunMarker(ctx, width, height, declinationDeg) {
            const sunX = width / 2;
            const sunY = ((90 - declinationDeg) / 180) * height;
            drawSunGlyph(ctx, sunX, sunY, height * 0.045);
        }

        // Earth's-own view: never tilted (always Earth's own north-up frame) — only
        // the daily spin applies. The month instead moves the Sun marker's latitude
        // and the night-side terminator, both driven by the same seasonal
        // declination. The night-alpha mask only depends on month, not hour, so
        // it's cached and only recomputed when the month actually changes.
        function makeEarthView(canvasId) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const grid = computeSphereGrid(width, height);

            let hour = 12;
            let month = 6;
            let nightAlpha = makeNightAlpha(width, height, declinationForMonth(month));

            function render() {
                if (!texData) return;
                const zAngle = hourToZAngle(hour);
                const R = rotationMatrixZ(zAngle);

                const frame = renderEquirectFrame(ctx, width, height, grid, R);
                applyNightShade(frame.data, width, height, nightAlpha);
                ctx.putImageData(frame, 0, 0);
                drawSunMarker(ctx, width, height, declinationForMonth(month));
            }

            onTextureReady.push(render);

            return {
                setHour(h) { hour = h; render(); },
                setMonth(m) {
                    month = m;
                    nightAlpha = makeNightAlpha(width, height, declinationForMonth(m));
                    render();
                },
            };
        }

        const earthView = makeEarthView('earthCanvas');

        // --- Draggable 3D globe -------------------------------------------------
        // Uses the same rotation math as the flat maps above, so the lit/dark side
        // always matches the sunlit meridian shown there. The camera can only orbit
        // in azimuth (drag left/right) — elevation is fixed at 0, i.e. the camera
        // always stays level with the orbital plane, so the axial tilt reads as a
        // lean rather than being foreshortened by a bird's-eye viewing angle.
        const globe = (() => {
            const AMBIENT = 0.14;
            // The currently-sunlit meridian always maps to world (1,0,0) regardless of
            // hour (that's the same invariant the flat maps rely on to always show the
            // subsolar meridian centered) — so azimuth 0 always faces the sunny side,
            // for every hour and month, not just at one specific moment.
            const DEFAULT_AZIMUTH = 0;

            const canvas = document.getElementById('globeCanvas');
            const ctx = canvas.getContext('2d');
            const W = canvas.width;
            const H = canvas.height;
            const cx = W * 0.5;
            const cy = H * 0.52;
            const radius = H * 0.42;

            // Camera basis for a given azimuth, elevation always 0 (in the orbital plane).
            function cameraBasis(azimuthDeg) {
                const az = deg2rad(azimuthDeg);
                const towardViewer = [Math.cos(az), Math.sin(az), 0];
                const worldUp = [0, 0, 1];
                // right = worldUp x towardViewer
                let right = [
                    worldUp[1] * towardViewer[2] - worldUp[2] * towardViewer[1],
                    worldUp[2] * towardViewer[0] - worldUp[0] * towardViewer[2],
                    worldUp[0] * towardViewer[1] - worldUp[1] * towardViewer[0],
                ];
                const rlen = Math.hypot(right[0], right[1], right[2]);
                right = [right[0] / rlen, right[1] / rlen, right[2] / rlen];
                // up = towardViewer x right
                const up = [
                    towardViewer[1] * right[2] - towardViewer[2] * right[1],
                    towardViewer[2] * right[0] - towardViewer[0] * right[2],
                    towardViewer[0] * right[1] - towardViewer[1] * right[0],
                ];
                return { right, up, towardViewer };
            }

            // Precompute per-pixel camera-local sphere coordinates once (layout-only,
            // independent of azimuth/hour) plus the visibility mask.
            const pixels = [];
            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const nx = (x - cx) / radius;
                    const ny = -(y - cy) / radius;
                    const r2 = nx * nx + ny * ny;
                    if (r2 > 1) continue;
                    const nz = Math.sqrt(Math.max(0, 1 - r2));
                    pixels.push({ x, y, nx, ny, nz });
                }
            }

            let azimuth = DEFAULT_AZIMUTH;
            let hour = 12;
            let month = 6;
            let dragging = false;
            let dragStartX = 0;
            let dragStartAzimuth = 0;
            let needsRender = false;

            function render() {
                if (!texData) return;
                const x_angle = -AXIAL_TILT_DEG;
                const zAngle = hourToZAngle(hour);
                const Q = matMul(rotationMatrixX(x_angle), rotationMatrixZ(zAngle));
                const Qt = transpose(Q);
                const { right, up, towardViewer } = cameraBasis(azimuth);

                // p_body = Q^T . p_world, and p_world = nx*right + ny*up + nz*towardViewer,
                // so precompute A = Q^T.right, B = Q^T.up, C = Q^T.towardViewer once per
                // frame; per pixel p_body is just nx*A + ny*B + nz*C.
                const A = matVec(Qt, right), B = matVec(Qt, up), C = matVec(Qt, towardViewer);

                // The Sun's direction tilts up/down out of the orbital plane with the
                // season (the axis itself doesn't move — "adjusting the facing of the
                // Earth to the sun" is modeled as the Sun's apparent direction shifting).
                const dec = deg2rad(declinationForMonth(month));
                const sunDir = [Math.cos(dec), 0, Math.sin(dec)];
                const rDotSun = right[0] * sunDir[0] + right[1] * sunDir[1] + right[2] * sunDir[2];
                const uDotSun = up[0] * sunDir[0] + up[1] * sunDir[1] + up[2] * sunDir[2];
                const tDotSun = towardViewer[0] * sunDir[0] + towardViewer[1] * sunDir[1] + towardViewer[2] * sunDir[2];

                const frame = ctx.createImageData(W, H);
                const out = frame.data;

                for (let i = 0; i < pixels.length; i++) {
                    const { x, y, nx, ny, nz } = pixels[i];
                    const bx = nx * A[0] + ny * B[0] + nz * C[0];
                    const by = nx * A[1] + ny * B[1] + nz * C[1];
                    const bz = nx * A[2] + ny * B[2] + nz * C[2];

                    const lon = Math.atan2(by, bx);
                    const lat = Math.asin(Math.max(-1, Math.min(1, bz)));

                    let tx = Math.floor(((lon + Math.PI) / (2 * Math.PI)) * texW) % texW;
                    if (tx < 0) tx += texW;
                    let ty = Math.floor(((Math.PI / 2 - lat) / Math.PI) * texH);
                    if (ty < 0) ty = 0; else if (ty >= texH) ty = texH - 1;

                    const ti = (ty * texW + tx) * 4;

                    // brightness = dot(p_world, sunDir), computed via the precomputed
                    // per-axis dot products above (p_world = nx*right + ny*up + nz*towardViewer).
                    const brightness = nx * rDotSun + ny * uDotSun + nz * tDotSun;
                    const shade = AMBIENT + (1 - AMBIENT) * Math.max(0, brightness);

                    const oi = (y * W + x) * 4;
                    out[oi] = texData[ti] * shade;
                    out[oi + 1] = texData[ti + 1] * shade;
                    out[oi + 2] = texData[ti + 2] * shade;
                    out[oi + 3] = 255;
                }

                ctx.clearRect(0, 0, W, H);
                ctx.putImageData(frame, 0, 0);

                // Rotation axis (fixed in world space; spin doesn't move the pole) drawn
                // on top, only its tips visible past the opaque globe disc.
                const northWorld = matVec(rotationMatrixX(x_angle), [0, 0, 1]);
                const southWorld = [-northWorld[0], -northWorld[1], -northWorld[2]];
                const project = (p, scale) => [
                    cx + radius * scale * (p[0] * right[0] + p[1] * right[1] + p[2] * right[2]),
                    cy - radius * scale * (p[0] * up[0] + p[1] * up[1] + p[2] * up[2]),
                ];
                const nTip = project(northWorld, 1.28);
                const sTip = project(southWorld, 1.28);

                ctx.strokeStyle = 'rgba(230, 230, 240, 0.55)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(nTip[0], nTip[1]);
                ctx.lineTo(sTip[0], sTip[1]);
                ctx.stroke();

                ctx.fillStyle = 'rgba(230, 230, 240, 0.85)';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('N', nTip[0], nTip[1] - 6);
                ctx.fillText('S', sTip[0], sTip[1] + 14);

                // Sun marker at the subsolar point (the point on the surface directly
                // facing the Sun, i.e. where brightness above would be at its max).
                // Only drawn when it's on the near side of the globe (tDotSun, the
                // Sun direction's component toward the viewer, is positive) — on the
                // far side it would show through the opaque sphere.
                if (tDotSun > 0) {
                    const sunScreen = project(sunDir, 1.0);
                    drawSunGlyph(ctx, sunScreen[0], sunScreen[1], radius * 0.07);
                }
            }

            function scheduleRender() {
                if (needsRender) return;
                needsRender = true;
                requestAnimationFrame(() => {
                    needsRender = false;
                    render();
                });
            }

            canvas.addEventListener('pointerdown', (e) => {
                dragging = true;
                dragStartX = e.clientX;
                dragStartAzimuth = azimuth;
                canvas.setPointerCapture(e.pointerId);
            });
            canvas.addEventListener('pointermove', (e) => {
                if (!dragging) return;
                const deltaX = e.clientX - dragStartX;
                azimuth = dragStartAzimuth - deltaX * 0.4;
                scheduleRender();
            });
            canvas.addEventListener('pointerup', () => { dragging = false; });
            canvas.addEventListener('pointercancel', () => { dragging = false; });

            onTextureReady.push(render);

            return {
                setHour(h) { hour = h; scheduleRender(); },
                setMonth(m) { month = m; scheduleRender(); },
                reset() { azimuth = DEFAULT_AZIMUTH; scheduleRender(); },
            };
        })();

        document.getElementById('resetGlobeBtn').addEventListener('click', () => globe.reset());

        const textureBtnCoordinated = document.getElementById('textureBtnCoordinated');
        const textureBtnReal = document.getElementById('textureBtnReal');

        function setTextureSrc(src) {
            if (src === currentTextureSrc) return;
            textureBtnCoordinated.classList.toggle('active', src === 'projection');
            textureBtnReal.classList.toggle('active', src === 'true');
            textureBtnCoordinated.setAttribute('aria-pressed', String(src === 'projection'));
            textureBtnReal.setAttribute('aria-pressed', String(src === 'true'));
            loadTexture(src);
        }

        textureBtnCoordinated.addEventListener('click', () => setTextureSrc('projection'));
        textureBtnReal.addEventListener('click', () => setTextureSrc('true'));

        // --- Month and hour sliders: drive all three views, fully client-side ---
        const monthSlider = document.getElementById('monthSlider');
        const monthValue = document.getElementById('monthValue');
        const slider = document.getElementById('hourSlider');
        const hourValue = document.getElementById('hourValue');

        // Tick dots, one per selectable value, spaced with simple linear percentages
        // so they land exactly evenly and line up with where the slider thumb stops.
        const SLIDER_THUMB_PX = 22; // must match input[type=range]::-webkit-slider-thumb width

        function renderTicks(containerId, count) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const half = SLIDER_THUMB_PX / 2;
            for (let i = 0; i < count; i++) {
                const tick = document.createElement('span');
                const fraction = i / (count - 1);
                // The thumb's center travels from half-thumb-width in from the left
                // edge to half-thumb-width in from the right edge — never the full
                // 0%-100% of the track — so ticks need the same inset to land where
                // the thumb actually stops instead of drifting off by up to half a
                // thumb-width at the ends (exact at the midpoint, worst at the edges).
                tick.style.left = `calc(${half}px + (100% - ${SLIDER_THUMB_PX}px) * ${fraction})`;
                container.appendChild(tick);
            }
        }
        renderTicks('monthTicks', 12);
        renderTicks('hourTicks', 25);

        // Scale-label text, positioned with the same thumb-inset math as the ticks
        // so the labels actually line up with where the slider stops, rather than
        // assuming the labelled values sit at the track's true 0%/100% edges.
        function renderScaleLabels(containerId, items) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const half = SLIDER_THUMB_PX / 2;
            items.forEach(({ fraction, text }) => {
                const span = document.createElement('span');
                span.textContent = text;
                span.style.left = `calc(${half}px + (100% - ${SLIDER_THUMB_PX}px) * ${fraction})`;
                span.style.transform = fraction <= 0.001 ? 'translateX(0)'
                    : fraction >= 0.999 ? 'translateX(-100%)'
                    : 'translateX(-50%)';
                container.appendChild(span);
            });
        }

        renderScaleLabels('hourScaleLabels', [0, 6, 12, 18, 24].map((h) => ({
            fraction: h / 24,
            text: `${String(h).padStart(2, '0')}:00`, // not formatHour(h): that wraps 24 to "00:00"
        })));
        // Only the solstice/equinox months, matching the orbit diagram's labels.
        // Wrapped in a named function (rather than a bare call) since
        // formatMonth() is language-dependent and this needs replaying on a
        // language switch — it's a draw-once call, not inside a render loop.
        function renderMonthScaleLabels() {
            renderScaleLabels('monthScaleLabels', [3, 6, 9, 12].map((m) => ({
                fraction: (m - 1) / 11,
                text: formatMonth(m).slice(0, 3),
            })));
        }
        renderMonthScaleLabels();
        onLangChange(renderMonthScaleLabels);

        // --- Orbit diagram: Earth's position around the Sun for the selected month.
        // Purely 2D/decorative — orbital position depends only on month (the hour of
        // day only spins Earth in place, it doesn't move it along the orbit), so this
        // never needs the texture and can draw immediately.
        function orbitPosition(month, cx, cy, rx, ry) {
            const angle = deg2rad((month - 3) * 30);
            return { x: cx - rx * Math.sin(angle), y: cy - ry * Math.cos(angle) };
        }

        function drawMiniEarth(ctx, x, y, r, highlighted) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = '#2f7fb8';
            ctx.fill();
            ctx.clip();
            ctx.fillStyle = '#3f9142';
            ctx.beginPath();
            ctx.ellipse(x - r * 0.3, y - r * 0.2, r * 0.55, r * 0.4, 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + r * 0.4, y + r * 0.35, r * 0.4, r * 0.3, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Axial tilt: a fixed direction in space, the same for every orbital
            // position — it's Earth's changing position around the Sun that creates
            // the seasons, not the tilt itself moving.
            const tiltRad = deg2rad(23.4);
            const axisLen = r * 1.7;
            const dx = Math.sin(tiltRad) * axisLen * 0.5;
            const dy = Math.cos(tiltRad) * axisLen * 0.5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x - dx, y + dy);
            ctx.lineTo(x + dx, y - dy);
            ctx.stroke();

            if (highlighted) {
                ctx.strokeStyle = 'rgba(255, 179, 71, 0.9)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(x, y, r + 4, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        function drawOrbitDiagram(month) {
            const canvas = document.getElementById('orbitCanvas');
            const ctx = canvas.getContext('2d');
            const W = canvas.width, H = canvas.height;
            const cx = W / 2, cy = H / 2;
            const rx = W * 0.36, ry = H * 0.3;

            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = 'rgba(174, 180, 199, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            const sunR = Math.min(W, H) * 0.09;
            const glow = ctx.createRadialGradient(cx, cy, sunR * 0.3, cx, cy, sunR * 1.8);
            glow.addColorStop(0, 'rgba(255, 200, 80, 0.9)');
            glow.addColorStop(1, 'rgba(255, 200, 80, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(cx, cy, sunR * 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffb03b';
            ctx.beginPath();
            ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(241, 243, 248, 0.85)';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(t('sunLabel'), cx, cy + sunR + 16);

            const seasonPoints = [
                { m: 3, label: t('marchEquinox') },
                { m: 6, label: t('juneSolstice') },
                { m: 9, label: t('septemberEquinox') },
                { m: 12, label: t('decemberSolstice') },
            ];
            ctx.font = '11px sans-serif';
            for (const { m, label } of seasonPoints) {
                const p = orbitPosition(m, cx, cy, rx, ry);
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(174, 180, 199, 0.6)';
                ctx.fill();
                ctx.fillStyle = 'rgba(174, 180, 199, 0.85)';
                ctx.textAlign = 'center';
                ctx.fillText(label, p.x, p.y < cy ? p.y - 10 : p.y + 18);
            }

            const current = orbitPosition(month, cx, cy, rx, ry);
            drawMiniEarth(ctx, current.x, current.y, Math.min(W, H) * 0.075, true);
        }

        function applyMonth(month) {
            monthSlider.value = month;
            monthValue.textContent = formatMonth(month);

            drawOrbitDiagram(month);
            sunView.setMonth(month);
            earthView.setMonth(month);
            globe.setMonth(month);
        }

        function applyHour(hour) {
            slider.value = hour;
            const label = formatHour(hour);
            hourValue.textContent = label;

            sunView.setHour(hour);
            earthView.setHour(hour);
            globe.setHour(hour);
        }

        monthSlider.addEventListener('input', () => {
            pauseAutoplay();
            applyMonth(Number(monthSlider.value));
        });

        slider.addEventListener('input', () => {
            pauseAutoplay();
            applyHour(Number(slider.value));
        });

        // --- Autoplay: the hour slider sweeps 0->24 every 10 seconds; each time it
        // wraps back to 0, the month advances by one (looping from December back to
        // January). Manually dragging either slider pauses it; the play/pause button
        // toggles it — resuming picks up from wherever the playhead was left.
        const playPauseBtn = document.getElementById('playPauseBtn');
        let autoplay = true;
        let playhead = { month: 6, hour: 0 };
        let lastFrameTime = null;
        const HOUR_CYCLE_MS = 10000;

        function updatePlayPauseButton() {
            playPauseBtn.innerHTML = autoplay
                ? '<span class="icon-pause"><span></span><span></span></span>'
                : '<span class="icon-play"></span>';
            playPauseBtn.setAttribute('aria-label', autoplay ? t('pauseLabel') : t('playLabel'));
        }

        // applyMonth/applyHour redraw the month value text and the orbit-diagram
        // canvas (Sun/season labels, both language-dependent); while autoplay is
        // running they already redraw every frame, but while paused nothing else
        // would refresh them on a language switch. Replaying with the sliders'
        // own current values (rather than `playhead`) is correct whether playing
        // or paused, and idempotent if autoplay redraws again a moment later.
        onLangChange(() => {
            applyMonth(Number(monthSlider.value));
            applyHour(Number(slider.value));
            updatePlayPauseButton();
        });

        function pauseAutoplay() {
            if (!autoplay) return;
            autoplay = false;
            updatePlayPauseButton();
        }

        function resumeAutoplay() {
            if (autoplay) return;
            autoplay = true;
            lastFrameTime = null; // don't apply a delta spanning the paused time
            updatePlayPauseButton();
            requestAnimationFrame(autoplayTick);
        }

        playPauseBtn.addEventListener('click', () => {
            if (autoplay) pauseAutoplay(); else resumeAutoplay();
        });

        function autoplayTick(timestamp) {
            if (!autoplay) return;
            if (lastFrameTime === null) lastFrameTime = timestamp;
            // Clamp the frame delta so a throttled/backgrounded tab regaining focus
            // can't cause a multi-lap jump — at most one wrap per tick either way.
            const dt = Math.min(timestamp - lastFrameTime, 100);
            lastFrameTime = timestamp;

            playhead.hour += (dt / HOUR_CYCLE_MS) * 24;
            if (playhead.hour >= 24) {
                playhead.hour -= 24;
                playhead.month = playhead.month >= 12 ? 1 : playhead.month + 1;
                applyMonth(playhead.month);
            }
            applyHour(playhead.hour);

            requestAnimationFrame(autoplayTick);
        }

        applyMonth(playhead.month);
        applyHour(playhead.hour);
        requestAnimationFrame(autoplayTick);
        loadTexture();

        // Match the 3D view's height to a flat-map card's image height exactly, by
        // measuring it directly rather than approximating with a fixed aspect-ratio
        // (which can't account for the padding/gap constants that don't scale with
        // width). Skipped below the 900px breakpoint, where the two halves stack
        // vertically and should size from their own natural aspect ratio instead.
        const splitPanelsEl = document.querySelector('.split-panels');
        const referenceImageFrame = document.getElementById('earthCanvas').closest('.image-frame');

        function syncGlobeRowHeight() {
            if (!splitPanelsEl || !referenceImageFrame) return;
            if (window.innerWidth <= 900) {
                splitPanelsEl.style.height = '';
                return;
            }
            const h = referenceImageFrame.getBoundingClientRect().height;
            if (h > 0) splitPanelsEl.style.height = `${h}px`;
        }

        window.addEventListener('resize', syncGlobeRowHeight);
        syncGlobeRowHeight();

        document.getElementById('footerYear').textContent = new Date().getFullYear();

        document.documentElement.lang = currentLang;
        applyStaticDict();
        renderLangToggle();
