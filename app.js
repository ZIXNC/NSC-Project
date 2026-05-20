/* ============================================================ */
/* app.js - Adaptive Logic & Blindspot Analyzer                 */
/* ไฟล์ JavaScript หลัก                                         */
/* ============================================================ */

/* ===== ส่วนที่ 0: ฟังก์ชันช่วยเหลือ ===== */

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals) {
    var result = Math.random() * (max - min) + min;
    return roundTo(result, decimals);
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function roundTo(num, decimals) {
    var factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a;
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function factorial(n) {
    if (n <= 1) return 1;
    var result = 1;
    for (var i = 2; i <= n; i++) result *= i;
    return result;
}

function combination(n, r) {
    if (r > n || r < 0) return 0;
    if (r === 0 || r === n) return 1;
    return factorial(n) / (factorial(r) * factorial(n - r));
}

function permutation(n, r) {
    if (r > n || r < 0) return 0;
    return factorial(n) / factorial(n - r);
}

/* ===== ส่วนที่ 1: ข้อมูลหลักสูตร ===== */

var CURRICULUM = {
    'M.1': {
        name: 'มัธยมศึกษาปีที่ 1',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'integers', name: 'จำนวนเต็ม' },
                    { key: 'geometric_constructions', name: 'การสร้างทางเรขาคณิต' },
                    { key: 'exponents', name: 'เลขยกกำลัง' },
                    { key: 'decimals_fractions', name: 'ทศนิยมและเศษส่วน' },
                    { key: 'shapes_2d_3d', name: 'รูปเรขาคณิตสองมิติและสามมิติ' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'linear_equations_1', name: 'สมการเชิงเส้นตัวแปรเดียว' },
                    { key: 'ratios', name: 'อัตราส่วน สัดส่วน และร้อยละ' },
                    { key: 'graphs_linear', name: 'กราฟและความสัมพันธ์เชิงเส้น' },
                    { key: 'statistics_1', name: 'สถิติ (1)' }
                ]
            }
        }
    },
    'M.2': {
        name: 'มัธยมศึกษาปีที่ 2',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'pythagorean', name: 'ทฤษฎีบทพีทาโกรัส' },
                    { key: 'real_numbers_intro', name: 'จำนวนจริงเบื้องต้น' },
                    { key: 'prisms_cylinders', name: 'ปริซึมและทรงกระบอก' },
                    { key: 'transformations', name: 'การแปลงทางเรขาคณิต' },
                    { key: 'exponent_properties', name: 'สมบัติของเลขยกกำลัง' },
                    { key: 'polynomials', name: 'พหุนาม' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'statistics_2', name: 'สถิติ (2)' },
                    { key: 'congruence', name: 'ความเท่ากันทุกประการ' },
                    { key: 'parallel_lines', name: 'เส้นขนาน' },
                    { key: 'geometric_reasoning', name: 'การให้เหตุผลทางเรขาคณิต' },
                    { key: 'factoring_2', name: 'การแยกตัวประกอบพหุนามดีกรีสอง' }
                ]
            }
        }
    },
    'M.3': {
        name: 'มัธยมศึกษาปีที่ 3',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'linear_inequalities', name: 'อสมการเชิงเส้นตัวแปรเดียว' },
                    { key: 'factoring_higher', name: 'การแยกตัวประกอบพหุนามดีกรีสูง' },
                    { key: 'quadratic_equations', name: 'สมการกำลังสองตัวแปรเดียว' },
                    { key: 'similarity', name: 'ความคล้าย' },
                    { key: 'quadratic_graphs', name: 'กราฟของฟังก์ชันกำลังสอง' },
                    { key: 'statistics_3', name: 'สถิติ (3)' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'systems_linear', name: 'ระบบสมการเชิงเส้นสองตัวแปร' },
                    { key: 'circles', name: 'วงกลม' },
                    { key: 'pyramids_cones_spheres', name: 'พีระมิด กรวย และทรงกลม' },
                    { key: 'probability_1', name: 'ความน่าจะเป็น' },
                    { key: 'trig_ratios', name: 'อัตราส่วนตรีโกณมิติ' }
                ]
            }
        }
    },
    'M.4': {
        name: 'มัธยมศึกษาปีที่ 4',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'sets', name: 'เซต' },
                    { key: 'logic', name: 'ตรรกศาสตร์' },
                    { key: 'real_numbers', name: 'จำนวนจริง' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'relations_functions', name: 'ความสัมพันธ์และฟังก์ชัน' },
                    { key: 'exp_log', name: 'ฟังก์ชันเอกซ์โพเนนเชียลและลอการิทึม' },
                    { key: 'analytic_geometry', name: 'เรขาคณิตวิเคราะห์และภาคตัดกรวย' }
                ]
            }
        }
    },
    'M.5': {
        name: 'มัธยมศึกษาปีที่ 5',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'trig_functions', name: 'ฟังก์ชันตรีโกณมิติ' },
                    { key: 'matrices', name: 'เมทริกซ์' },
                    { key: 'vectors', name: 'เวกเตอร์' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'complex_numbers', name: 'จำนวนเชิงซ้อน' },
                    { key: 'counting_principles', name: 'หลักการนับเบื้องต้น' },
                    { key: 'probability_2', name: 'ความน่าจะเป็น (2)' }
                ]
            }
        }
    },
    'M.6': {
        name: 'มัธยมศึกษาปีที่ 6',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'sequences_series', name: 'ลำดับและอนุกรม' },
                    { key: 'calculus_intro', name: 'แคลคูลัสเบื้องต้น' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'statistics_meaning', name: 'ความหมายของสถิติและข้อมูล' },
                    { key: 'qualitative_analysis', name: 'การวิเคราะห์ข้อมูลเชิงคุณภาพ' },
                    { key: 'quantitative_analysis', name: 'การวิเคราะห์ข้อมูลเชิงปริมาณ' },
                    { key: 'random_variables', name: 'ตัวแปรสุ่มและการแจกแจงความน่าจะเป็น' }
                ]
            }
        }
    }
};

/* ===== ส่วนที่ 2: ที่วางฟังก์ชันสร้างคำถาม ===== */
// ===GENERATOR_PLACEHOLDER===

/* ===== ส่วนที่ 3: ตารางเชื่อมบทเรียน ===== */

var QUESTION_GENERATORS = {
    'integers': generateQuestion_integers,
    'geometric_constructions': generateQuestion_geometric_constructions,
    'exponents': generateQuestion_exponents,
    'decimals_fractions': generateQuestion_decimals_fractions,
    'shapes_2d_3d': generateQuestion_shapes_2d_3d,
    'linear_equations_1': generateQuestion_linear_equations_1,
    'ratios': generateQuestion_ratios,
    'graphs_linear': generateQuestion_graphs_linear,
    'statistics_1': generateQuestion_statistics_1,
    'pythagorean': generateQuestion_pythagorean,
    'real_numbers_intro': generateQuestion_real_numbers_intro,
    'prisms_cylinders': generateQuestion_prisms_cylinders,
    'transformations': generateQuestion_transformations,
    'exponent_properties': generateQuestion_exponent_properties,
    'polynomials': generateQuestion_polynomials,
    'statistics_2': generateQuestion_statistics_2,
    'congruence': generateQuestion_congruence,
    'parallel_lines': generateQuestion_parallel_lines,
    'geometric_reasoning': generateQuestion_geometric_reasoning,
    'factoring_2': generateQuestion_factoring_2,
    'linear_inequalities': generateQuestion_linear_inequalities,
    'factoring_higher': generateQuestion_factoring_higher,
    'quadratic_equations': generateQuestion_quadratic_equations,
    'similarity': generateQuestion_similarity,
    'quadratic_graphs': generateQuestion_quadratic_graphs,
    'statistics_3': generateQuestion_statistics_3,
    'systems_linear': generateQuestion_systems_linear,
    'circles': generateQuestion_circles,
    'pyramids_cones_spheres': generateQuestion_pyramids_cones_spheres,
    'probability_1': generateQuestion_probability_1,
    'trig_ratios': generateQuestion_trig_ratios,
    'sets': generateQuestion_sets,
    'logic': generateQuestion_logic,
    'real_numbers': generateQuestion_real_numbers,
    'relations_functions': generateQuestion_relations_functions,
    'exp_log': generateQuestion_exp_log,
    'analytic_geometry': generateQuestion_analytic_geometry,
    'trig_functions': generateQuestion_trig_functions,
    'matrices': generateQuestion_matrices,
    'vectors': generateQuestion_vectors,
    'complex_numbers': generateQuestion_complex_numbers,
    'counting_principles': generateQuestion_counting_principles,
    'probability_2': generateQuestion_probability_2,
    'sequences_series': generateQuestion_sequences_series,
    'calculus_intro': generateQuestion_calculus_intro,
    'statistics_meaning': generateQuestion_statistics_meaning,
    'qualitative_analysis': generateQuestion_qualitative_analysis,
    'quantitative_analysis': generateQuestion_quantitative_analysis,
    'random_variables': generateQuestion_random_variables
};

/* ===== ส่วนที่ 4: ชื่อภาษาไทยของ Blindspot Tags ===== */

var BLINDSPOT_TAG_NAMES = {
    'Sign_Error': 'ผิดเครื่องหมาย (บวก/ลบ)',
    'Operation_Swap': 'ใช้ตัวดำเนินการผิด',
    'Formula_Confusion': 'ใช้สูตรผิด/สับสนสูตร',
    'Order_Error': 'ลำดับผิด',
    'Forgot_Step': 'ลืมขั้นตอน',
    'Unit_Confusion': 'สับสนหน่วย',
    'Boundary_Error': 'ขอบเขตผิด',
    'Concept_Mix': 'สับสนแนวคิด',
    'Partial_Answer': 'ตอบไม่ครบ',
    'Inverse_Error': 'ใช้ตัวผกผันผิด'
};

var BLINDSPOT_BAR_CLASS = {
    'Sign_Error': 'bar-sign', 'Operation_Swap': 'bar-operation',
    'Formula_Confusion': 'bar-formula', 'Order_Error': 'bar-order',
    'Forgot_Step': 'bar-forgot', 'Unit_Confusion': 'bar-unit',
    'Boundary_Error': 'bar-boundary', 'Concept_Mix': 'bar-concept',
    'Partial_Answer': 'bar-partial', 'Inverse_Error': 'bar-inverse'
};

/* ===== ส่วนที่ 5: ระบบ Analytics ===== */

var STORAGE_KEY = 'blindspot_analyzer_data';

function loadAnalytics() {
    try {
        var data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) {}
    return { history: [], blindspotCounts: {}, chapterStats: {}, bestStreak: 0 };
}

function saveAnalytics(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

function recordAnswer(chapterKey, isCorrect, blindspotTag) {
    var data = loadAnalytics();
    data.history.push({ date: new Date().toISOString(), chapter: chapterKey, correct: isCorrect, blindspotTag: blindspotTag || null });
    if (data.history.length > 1000) data.history = data.history.slice(-1000);
    if (blindspotTag) {
        if (!data.blindspotCounts[blindspotTag]) data.blindspotCounts[blindspotTag] = 0;
        data.blindspotCounts[blindspotTag]++;
    }
    if (!data.chapterStats[chapterKey]) data.chapterStats[chapterKey] = { attempted: 0, correct: 0 };
    data.chapterStats[chapterKey].attempted++;
    if (isCorrect) data.chapterStats[chapterKey].correct++;
    if (currentStreak > data.bestStreak) data.bestStreak = currentStreak;
    saveAnalytics(data);
}

function getTopBlindspots(limit) {
    var data = loadAnalytics();
    var entries = [];
    for (var tag in data.blindspotCounts) entries.push({ tag: tag, count: data.blindspotCounts[tag] });
    entries.sort(function(a, b) { return b.count - a.count; });
    return limit ? entries.slice(0, limit) : entries;
}

function getOverallStats() {
    var data = loadAnalytics();
    var totalAttempted = 0, totalCorrect = 0;
    for (var key in data.chapterStats) {
        totalAttempted += data.chapterStats[key].attempted;
        totalCorrect += data.chapterStats[key].correct;
    }
    return {
        total: totalAttempted, correct: totalCorrect,
        accuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
        bestStreak: data.bestStreak
    };
}

function getWeakestChapters() {
    var data = loadAnalytics();
    var chapters = [];
    for (var key in data.chapterStats) {
        var s = data.chapterStats[key];
        if (s.attempted >= 2) chapters.push({ key: key, accuracy: s.correct / s.attempted, attempted: s.attempted });
    }
    chapters.sort(function(a, b) { return a.accuracy - b.accuracy; });
    return chapters;
}

/* ===== ส่วนที่ 6: ระบบแสดงภาพจำลอง ===== */

function renderVisual(visualType, visualData) {
    var canvas = document.getElementById('visual-canvas');
    var container = document.getElementById('visual-container');
    if (!canvas || !container) return;
    var ctx = canvas.getContext('2d');
    var containerWidth = container.clientWidth - 48;
    canvas.width = Math.min(600, containerWidth);
    canvas.height = 320;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (visualType) {
        case 'number_line': drawNumberLine(ctx, canvas, visualData); break;
        case 'triangle': drawTriangle(ctx, canvas, visualData); break;
        case 'shape_2d': drawShape2D(ctx, canvas, visualData); break;
        case 'shape_3d': drawShape3D(ctx, canvas, visualData); break;
        case 'fraction_bar': drawFractionBar(ctx, canvas, visualData); break;
        case 'coordinate_plane': drawCoordinatePlane(ctx, canvas, visualData); break;
        case 'balance_scale': drawBalanceScale(ctx, canvas, visualData); break;
        case 'bar_chart': drawBarChart(ctx, canvas, visualData); break;
        case 'parallel_lines': drawParallelLines(ctx, canvas, visualData); break;
        case 'circle_diagram': drawCircleDiagram(ctx, canvas, visualData); break;
        case 'venn_diagram': drawVennDiagram(ctx, canvas, visualData); break;
        case 'truth_table': drawTruthTable(ctx, canvas, visualData); break;
        case 'unit_circle': drawUnitCircle(ctx, canvas, visualData); break;
        case 'matrix_grid': drawMatrixGrid(ctx, canvas, visualData); break;
        case 'complex_plane': drawComplexPlane(ctx, canvas, visualData); break;
        case 'tree_diagram': drawTreeDiagram(ctx, canvas, visualData); break;
        case 'function_curve': drawFunctionCurve(ctx, canvas, visualData); break;
        case 'sequence_visual': drawSequenceVisual(ctx, canvas, visualData); break;
        case 'distribution': drawDistribution(ctx, canvas, visualData); break;
        default: drawDefaultVisual(ctx, canvas, visualData);
    }
}

function drawText(ctx, text, x, y, color, size, align) {
    ctx.fillStyle = color || '#e2e8f0'; ctx.font = (size || 14) + 'px "Noto Sans Thai","Inter",sans-serif';
    ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y);
}
function drawNumber(ctx, text, x, y, color, size) {
    ctx.fillStyle = color || '#38bdf8'; ctx.font = 'bold ' + (size || 16) + 'px "JetBrains Mono",monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y);
}
function drawLine(ctx, x1, y1, x2, y2, color, width) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = color || '#38bdf8'; ctx.lineWidth = width || 2; ctx.stroke();
}
function drawDot(ctx, x, y, radius, color) {
    ctx.beginPath(); ctx.arc(x, y, radius || 4, 0, Math.PI * 2);
    ctx.fillStyle = color || '#38bdf8'; ctx.fill();
}
function drawArrow(ctx, fx, fy, tx, ty, color, w) {
    var hl = 10, a = Math.atan2(ty - fy, tx - fx);
    drawLine(ctx, fx, fy, tx, ty, color, w);
    ctx.beginPath(); ctx.moveTo(tx, ty);
    ctx.lineTo(tx - hl * Math.cos(a - Math.PI/6), ty - hl * Math.sin(a - Math.PI/6));
    ctx.lineTo(tx - hl * Math.cos(a + Math.PI/6), ty - hl * Math.sin(a + Math.PI/6));
    ctx.closePath(); ctx.fillStyle = color || '#38bdf8'; ctx.fill();
}

function drawNumberLine(ctx, canvas, d) {
    var w = canvas.width, h = canvas.height, pts = d.points || [0], labels = d.labels || [];
    var mn = Math.min.apply(null, pts) - 3, mx = Math.max.apply(null, pts) + 3, rng = mx - mn || 10;
    var ly = h/2, px = 50, lw = w - px*2;
    drawLine(ctx, px, ly, w-px, ly, '#334155', 2);
    drawArrow(ctx, w-px-5, ly, w-px+10, ly, '#334155', 2);
    var step = Math.max(1, Math.ceil(rng/15));
    for (var i = Math.ceil(mn/step)*step; i <= mx; i += step) {
        var x = px + ((i-mn)/rng)*lw;
        drawLine(ctx, x, ly-6, x, ly+6, '#475569', 1);
        drawNumber(ctx, i.toString(), x, ly+22, '#64748b', 11);
    }
    var cols = ['#38bdf8','#a78bfa','#34d399','#fbbf24'];
    for (var j = 0; j < pts.length; j++) {
        var ppx = px + ((pts[j]-mn)/rng)*lw;
        drawDot(ctx, ppx, ly, 7, cols[j%cols.length]);
        drawNumber(ctx, (labels[j]||pts[j]).toString(), ppx, ly-22, cols[j%cols.length], 13);
    }
    if (d.title) drawText(ctx, d.title, w/2, 25, '#94a3b8', 13);
}

function drawTriangle(ctx, canvas, d) {
    var w = canvas.width, h = canvas.height, sides = d.sides || [3,4,5], labels = d.labels || [];
    var maxS = Math.max.apply(null, sides), scale = Math.min(w*0.35,h*0.35)/maxS;
    var sA = sides[0]*scale, sB = sides[1]*scale;
    var ax = w/2-sA/2, ay = h/2+sB/2, bx = w/2+sA/2, by = ay, cx2 = ax, cy2 = h/2-sB/2;
    if (d.rightAngle !== false) {
        var sq = 12;
        ctx.beginPath(); ctx.moveTo(ax+sq,ay); ctx.lineTo(ax+sq,ay-sq); ctx.lineTo(ax,ay-sq);
        ctx.strokeStyle='#64748b'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx2,cy2); ctx.closePath();
    ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(56,189,248,0.05)'; ctx.fill();
    drawNumber(ctx, (labels[0]||sides[0]).toString(), (ax+bx)/2, ay+25, '#38bdf8', 14);
    drawNumber(ctx, (labels[1]||sides[1]).toString(), ax-25, (ay+cy2)/2, '#a78bfa', 14);
    if (sides[2]) drawNumber(ctx, (labels[2]||sides[2]).toString(), (bx+cx2)/2+18, (by+cy2)/2, '#34d399', 14);
    if (d.title) drawText(ctx, d.title, w/2, 22, '#94a3b8', 13);
}

function drawShape2D(ctx, canvas, d) {
    var w = canvas.width, h = canvas.height, cx = w/2, cy = h/2, type = d.type || 'rectangle';
    if (type === 'rectangle') {
        var rw = Math.min(200,(d.width||10)*15), rh = Math.min(150,(d.height||7)*15);
        ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.strokeRect(cx-rw/2,cy-rh/2,rw,rh);
        ctx.fillStyle='rgba(56,189,248,0.05)'; ctx.fillRect(cx-rw/2,cy-rh/2,rw,rh);
        drawNumber(ctx,(d.width||'?').toString(),cx,cy+rh/2+20,'#38bdf8',14);
        drawNumber(ctx,(d.height||'?').toString(),cx-rw/2-25,cy,'#a78bfa',14);
    } else if (type === 'circle') {
        var r = Math.min(100,(d.radius||5)*15);
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke();
        ctx.fillStyle='rgba(56,189,248,0.05)'; ctx.fill();
        drawLine(ctx,cx,cy,cx+r,cy,'#a78bfa',1.5);
        drawNumber(ctx,'r = '+(d.radius||'?'),cx+r/2,cy-15,'#a78bfa',13);
    } else if (type === 'triangle') {
        var base = Math.min(200,(d.base||6)*18), th = Math.min(150,(d.triHeight||4)*18);
        ctx.beginPath(); ctx.moveTo(cx-base/2,cy+th/2); ctx.lineTo(cx+base/2,cy+th/2); ctx.lineTo(cx,cy-th/2); ctx.closePath();
        ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke(); ctx.fillStyle='rgba(56,189,248,0.05)'; ctx.fill();
        drawNumber(ctx,(d.base||'?').toString(),cx,cy+th/2+20,'#38bdf8',14);
        drawLine(ctx,cx,cy-th/2,cx,cy+th/2,'#64748b',1);
        drawNumber(ctx,'h='+(d.triHeight||'?'),cx+20,cy,'#a78bfa',12);
    }
    if (d.title) drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawShape3D(ctx, canvas, d) {
    var w = canvas.width, h = canvas.height, cx = w/2, cy = h/2, type = d.type || 'cylinder';
    if (type === 'cylinder') {
        var rr=60, hh=120;
        ctx.beginPath(); ctx.ellipse(cx,cy-hh/2,rr,20,0,0,Math.PI*2); ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke();
        drawLine(ctx,cx-rr,cy-hh/2,cx-rr,cy+hh/2,'#38bdf8',2); drawLine(ctx,cx+rr,cy-hh/2,cx+rr,cy+hh/2,'#38bdf8',2);
        ctx.beginPath(); ctx.ellipse(cx,cy+hh/2,rr,20,0,0,Math.PI); ctx.strokeStyle='#38bdf8'; ctx.stroke();
        drawNumber(ctx,'r='+(d.radius||'?'),cx+rr+15,cy-hh/2,'#a78bfa',12);
        drawNumber(ctx,'h='+(d.height||'?'),cx-rr-25,cy,'#34d399',12);
    } else if (type === 'sphere') {
        var sr=80;
        ctx.beginPath(); ctx.arc(cx,cy,sr,0,Math.PI*2); ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke();
        drawLine(ctx,cx,cy,cx+sr,cy,'#a78bfa',1.5);
        drawNumber(ctx,'r='+(d.radius||'?'),cx+sr/2,cy-15,'#a78bfa',13);
    } else if (type === 'cone') {
        var cr=50, ch=130;
        ctx.beginPath(); ctx.moveTo(cx,cy-ch/2); ctx.lineTo(cx-cr,cy+ch/2); ctx.lineTo(cx+cr,cy+ch/2); ctx.closePath();
        ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke();
        drawLine(ctx,cx,cy-ch/2,cx,cy+ch/2,'#64748b',1);
        drawNumber(ctx,'h='+(d.height||'?'),cx+15,cy,'#34d399',12);
        drawNumber(ctx,'r='+(d.radius||'?'),cx+cr/2,cy+ch/2+25,'#a78bfa',12);
    } else {
        var pw=100, ppH=100;
        ctx.beginPath(); ctx.moveTo(cx,cy-ppH/2-15); ctx.lineTo(cx-pw/2,cy+ppH/2); ctx.lineTo(cx+pw/2,cy+ppH/2); ctx.closePath();
        ctx.strokeStyle='#38bdf8'; ctx.lineWidth=2; ctx.stroke();
        drawLine(ctx,cx,cy-ppH/2-15,cx,cy+ppH/2,'#64748b',1);
        drawNumber(ctx,'h='+(d.height||'?'),cx+15,cy,'#34d399',12);
    }
    if (d.title) drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawFractionBar(ctx, canvas, d) {
    var w = canvas.width, h = canvas.height, total = d.denominator||d.total||10, part = d.numerator||d.part||3;
    var bW = Math.min(400,w-100), bH = 40, x = (w-bW)/2, y = h/2-bH/2;
    ctx.fillStyle='rgba(56,189,248,0.1)'; ctx.strokeStyle='#334155'; ctx.lineWidth=1;
    ctx.fillRect(x,y,bW,bH); ctx.strokeRect(x,y,bW,bH);
    ctx.fillStyle='rgba(56,189,248,0.3)'; ctx.fillRect(x,y,(part/total)*bW,bH);
    for (var i=1;i<total;i++) drawLine(ctx,x+(i/total)*bW,y,x+(i/total)*bW,y+bH,'#475569',1);
    drawNumber(ctx,part+'/'+total,w/2,y-25,'#38bdf8',16);
    if (d.title) drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawCoordinatePlane(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,px=50,py=40,pw=w-px*2,ph=h-py*2;
    var xMin=d.xMin!==undefined?d.xMin:-10,xMax=d.xMax!==undefined?d.xMax:10;
    var yMin=d.yMin!==undefined?d.yMin:-10,yMax=d.yMax!==undefined?d.yMax:10;
    var xR=xMax-xMin,yR=yMax-yMin;
    function toX(v){return px+((v-xMin)/xR)*pw;} function toY(v){return py+ph-((v-yMin)/yR)*ph;}
    var step=Math.max(1,Math.ceil(xR/20));
    for(var gx=Math.ceil(xMin);gx<=xMax;gx+=step)drawLine(ctx,toX(gx),py,toX(gx),py+ph,'rgba(51,65,85,0.3)',0.5);
    for(var gy=Math.ceil(yMin);gy<=yMax;gy+=step)drawLine(ctx,px,toY(gy),px+pw,toY(gy),'rgba(51,65,85,0.3)',0.5);
    if(yMin<=0&&yMax>=0)drawLine(ctx,px,toY(0),px+pw,toY(0),'#475569',1.5);
    if(xMin<=0&&xMax>=0)drawLine(ctx,toX(0),py,toX(0),py+ph,'#475569',1.5);
    for(var tx=Math.ceil(xMin);tx<=xMax;tx+=step){if(tx===0)continue;drawNumber(ctx,tx.toString(),toX(tx),toY(0)+16,'#64748b',10);}
    for(var ty=Math.ceil(yMin);ty<=yMax;ty+=step){if(ty===0)continue;drawNumber(ctx,ty.toString(),toX(0)-18,toY(ty),'#64748b',10);}
    var pts=d.points||[],dc=['#38bdf8','#a78bfa','#34d399','#fbbf24'];
    for(var pi=0;pi<pts.length;pi++){var pt=pts[pi];drawDot(ctx,toX(pt[0]),toY(pt[1]),5,dc[pi%dc.length]);drawText(ctx,'('+pt[0]+','+pt[1]+')',toX(pt[0])+5,toY(pt[1])-14,dc[pi%dc.length],11,'left');}
    var lines=d.lines||[],lc=['#38bdf8','#a78bfa','#34d399'];
    for(var li=0;li<lines.length;li++){var ln=lines[li];drawLine(ctx,toX(xMin),toY(ln.m*xMin+ln.b),toX(xMax),toY(ln.m*xMax+ln.b),lc[li%lc.length],2);}
    if(d.parabola){var pa=d.parabola;ctx.beginPath();var st=false;for(var ppx=xMin;ppx<=xMax;ppx+=0.1){var ppy=pa.a*ppx*ppx+pa.b*ppx+pa.c;var cpx=toX(ppx),cpy=toY(ppy);if(cpy>=py-5&&cpy<=py+ph+5){if(!st){ctx.moveTo(cpx,cpy);st=true;}else ctx.lineTo(cpx,cpy);}}ctx.strokeStyle='#a78bfa';ctx.lineWidth=2;ctx.stroke();}
    if(d.title)drawText(ctx,d.title,w/2,18,'#94a3b8',12);
}

function drawBalanceScale(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,cx=w/2;
    drawLine(ctx,cx,h-40,cx,h/2+20,'#475569',3);
    ctx.beginPath();ctx.moveTo(cx-40,h-40);ctx.lineTo(cx+40,h-40);ctx.lineTo(cx+30,h-30);ctx.lineTo(cx-30,h-30);ctx.closePath();ctx.fillStyle='#334155';ctx.fill();
    drawLine(ctx,cx-140,h/2+20,cx+140,h/2+20,'#38bdf8',3);
    drawDot(ctx,cx-120,h/2+20,4,'#38bdf8');drawDot(ctx,cx+120,h/2+20,4,'#38bdf8');
    drawNumber(ctx,d.left||'?',cx-120,h/2+60,'#38bdf8',15);drawNumber(ctx,d.right||'?',cx+120,h/2+60,'#a78bfa',15);
    drawText(ctx,'=',cx,h/2,'#fbbf24',22);
    if(d.title)drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawBarChart(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,labels=d.labels||[],vals=d.values||[],px=60,py=40,ph=h-py*2,pw=w-px-30;
    if(!vals.length)return;var mx=Math.max.apply(null,vals)*1.15||1;
    var bW=Math.min(40,(pw/vals.length)*0.7),gap=(pw-bW*vals.length)/(vals.length+1);
    drawLine(ctx,px,py,px,py+ph,'#475569',1.5);drawLine(ctx,px,py+ph,px+pw,py+ph,'#475569',1.5);
    var bc=['#38bdf8','#a78bfa','#34d399','#fbbf24','#f87171','#22d3ee','#fb923c'];
    for(var i=0;i<vals.length;i++){var bx=px+gap+i*(bW+gap),bh=(vals[i]/mx)*ph,by=py+ph-bh;ctx.fillStyle=bc[i%bc.length];ctx.fillRect(bx,by,bW,bh);drawNumber(ctx,vals[i].toString(),bx+bW/2,by-12,'#e2e8f0',11);if(labels[i])drawText(ctx,labels[i].toString(),bx+bW/2,py+ph+16,'#94a3b8',10);}
    if(d.title)drawText(ctx,d.title,w/2,18,'#94a3b8',12);
}

function drawParallelLines(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height;
    drawLine(ctx,40,h/2-50,w-40,h/2-50,'#38bdf8',2);drawLine(ctx,40,h/2+50,w-40,h/2+50,'#38bdf8',2);
    drawLine(ctx,w/2-80,h/2-120,w/2+80,h/2+120,'#a78bfa',2);
    drawNumber(ctx,(d.angle||'?')+'\u00B0',w/2+20,h/2-65,'#fbbf24',14);
    drawText(ctx,d.type||'',w/2,22,'#94a3b8',12);
}

function drawCircleDiagram(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,r=Math.min(w,h)*0.3;
    ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='#38bdf8';ctx.lineWidth=2;ctx.stroke();
    if(d.angle){var sa=-Math.PI/2,ea=sa+(d.angle*Math.PI/180);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,sa,ea);ctx.closePath();ctx.fillStyle='rgba(167,139,250,0.2)';ctx.fill();ctx.strokeStyle='#a78bfa';ctx.lineWidth=2;ctx.stroke();drawNumber(ctx,d.angle+'\u00B0',cx+30,cy-30,'#fbbf24',14);}
    drawLine(ctx,cx,cy,cx+r,cy,'#34d399',1.5);drawNumber(ctx,'r = '+(d.radius||'?'),cx+r/2,cy-15,'#34d399',12);
    if(d.title)drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawVennDiagram(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,r=Math.min(w,h)*0.25;
    ctx.beginPath();ctx.arc(w/2-r*0.5,h/2,r,0,Math.PI*2);ctx.strokeStyle='#38bdf8';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='rgba(56,189,248,0.08)';ctx.fill();
    ctx.beginPath();ctx.arc(w/2+r*0.5,h/2,r,0,Math.PI*2);ctx.strokeStyle='#a78bfa';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='rgba(167,139,250,0.08)';ctx.fill();
    drawText(ctx,'A',w/2-r,h/2-r-12,'#38bdf8',15);drawText(ctx,'B',w/2+r,h/2-r-12,'#a78bfa',15);
    if(d.onlyA!==undefined)drawNumber(ctx,d.onlyA.toString(),w/2-r*0.8,h/2,'#38bdf8',16);
    if(d.intersection!==undefined)drawNumber(ctx,d.intersection.toString(),w/2,h/2,'#fbbf24',16);
    if(d.onlyB!==undefined)drawNumber(ctx,d.onlyB.toString(),w/2+r*0.8,h/2,'#a78bfa',16);
    if(d.title)drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawTruthTable(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,hd=d.headers||['p','q','p->q'],rows=d.rows||[],cols=hd.length;
    var cW=Math.min(100,(w-60)/cols),rH=28,sx=(w-cW*cols)/2,sy=40;
    ctx.fillStyle='rgba(56,189,248,0.15)';ctx.fillRect(sx,sy,cW*cols,rH);
    for(var ci=0;ci<cols;ci++)drawText(ctx,hd[ci],sx+ci*cW+cW/2,sy+rH/2,'#38bdf8',13);
    for(var ri=0;ri<rows.length;ri++){var ry=sy+(ri+1)*rH;if(ri%2===0){ctx.fillStyle='rgba(255,255,255,0.02)';ctx.fillRect(sx,ry,cW*cols,rH);}for(var cj=0;cj<cols;cj++){var v=rows[ri][cj],clr=v==='T'||v===1?'#34d399':'#f87171';drawText(ctx,v.toString(),sx+cj*cW+cW/2,ry+rH/2,clr,13);}}
    ctx.strokeStyle='#334155';ctx.lineWidth=1;ctx.strokeRect(sx,sy,cW*cols,rH*(rows.length+1));
}

function drawUnitCircle(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,r=Math.min(w,h)*0.32;
    drawLine(ctx,cx-r-30,cy,cx+r+30,cy,'#334155',1);drawLine(ctx,cx,cy-r-30,cx,cy+r+30,'#334155',1);
    ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='#38bdf8';ctx.lineWidth=2;ctx.stroke();
    var deg=d.angle||45,rad=-deg*Math.PI/180,ppx=cx+r*Math.cos(rad),ppy=cy+r*Math.sin(rad);
    drawLine(ctx,cx,cy,ppx,ppy,'#a78bfa',2);drawDot(ctx,ppx,ppy,5,'#a78bfa');
    drawLine(ctx,ppx,ppy,ppx,cy,'#34d399',1.5);drawLine(ctx,cx,cy,ppx,cy,'#fbbf24',1.5);
    drawText(ctx,'sin',ppx+10,(ppy+cy)/2,'#34d399',11,'left');drawText(ctx,'cos',(cx+ppx)/2,cy+16,'#fbbf24',11);
    drawNumber(ctx,deg+'\u00B0',cx+30,cy-12,'#e2e8f0',12);
    ctx.beginPath();ctx.arc(cx,cy,25,0,-deg*Math.PI/180,true);ctx.strokeStyle='#fbbf24';ctx.lineWidth=1.5;ctx.stroke();
}

function drawMatrixGrid(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,m=d.matrix||[[1,0],[0,1]],rows=m.length,cols=m[0].length;
    var cW=50,cH=35,sx=(w-cW*cols)/2,sy=(h-cH*rows)/2;
    ctx.beginPath();ctx.moveTo(sx-10,sy-5);ctx.lineTo(sx-18,sy-5);ctx.lineTo(sx-18,sy+cH*rows+5);ctx.lineTo(sx-10,sy+cH*rows+5);ctx.strokeStyle='#38bdf8';ctx.lineWidth=2;ctx.stroke();
    var ex=sx+cW*cols;ctx.beginPath();ctx.moveTo(ex+10,sy-5);ctx.lineTo(ex+18,sy-5);ctx.lineTo(ex+18,sy+cH*rows+5);ctx.lineTo(ex+10,sy+cH*rows+5);ctx.stroke();
    for(var ri=0;ri<rows;ri++)for(var ci=0;ci<cols;ci++)drawNumber(ctx,m[ri][ci].toString(),sx+ci*cW+cW/2,sy+ri*cH+cH/2,'#e2e8f0',15);
    if(d.title)drawText(ctx,d.title,w/2,22,'#94a3b8',13);
}

function drawComplexPlane(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,re=d.real||3,im=d.imag||4;
    var ma=Math.max(Math.abs(re),Math.abs(im))+2,sc=Math.min(w,h)*0.35/ma;
    drawArrow(ctx,40,cy,w-40,cy,'#475569',1.5);drawArrow(ctx,cx,h-30,cx,30,'#475569',1.5);
    drawText(ctx,'Re',w-35,cy+15,'#64748b',11);drawText(ctx,'Im',cx+15,35,'#64748b',11);
    var ppx=cx+re*sc,ppy=cy-im*sc;
    ctx.setLineDash([4,4]);drawLine(ctx,ppx,cy,ppx,ppy,'#334155',1);drawLine(ctx,cx,ppy,ppx,ppy,'#334155',1);ctx.setLineDash([]);
    drawLine(ctx,cx,cy,ppx,ppy,'#a78bfa',2);drawDot(ctx,ppx,ppy,6,'#a78bfa');
    drawText(ctx,re+' + '+im+'i',ppx+12,ppy-12,'#a78bfa',13,'left');
    if(d.title)drawText(ctx,d.title,w/2,18,'#94a3b8',12);
}

function drawTreeDiagram(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,br=d.branches||['A','B','C'],n=br.length;
    var sx=w*0.15,sy=h/2,gap=(h-60)/(n+1);
    drawDot(ctx,sx,sy,6,'#38bdf8');
    for(var i=0;i<n;i++){var ey=30+gap*(i+1);drawLine(ctx,sx,sy,w*0.5,ey,'#334155',1.5);drawDot(ctx,w*0.5,ey,4,'#a78bfa');drawText(ctx,br[i].toString(),w*0.5+15,ey,'#e2e8f0',12,'left');}
    if(d.title)drawText(ctx,d.title,w/2,18,'#94a3b8',12);
}

function drawFunctionCurve(ctx, canvas, d) {
    var md={xMin:d.xMin!=null?d.xMin:-5,xMax:d.xMax!=null?d.xMax:5,yMin:d.yMin!=null?d.yMin:-5,yMax:d.yMax!=null?d.yMax:10,points:d.points||[],title:d.title||''};
    drawCoordinatePlane(ctx,canvas,md);
    if(d.coefficients){var w=canvas.width,px=50,py=40,pw=w-px*2,ph=canvas.height-py*2;
    ctx.beginPath();var st=false;for(var x=md.xMin;x<=md.xMax;x+=0.05){var y=0;for(var ci=0;ci<d.coefficients.length;ci++)y+=d.coefficients[ci]*Math.pow(x,d.coefficients.length-1-ci);var cx2=px+((x-md.xMin)/(md.xMax-md.xMin))*pw,cy2=py+ph-((y-md.yMin)/(md.yMax-md.yMin))*ph;if(cy2>=py-5&&cy2<=py+ph+5){if(!st){ctx.moveTo(cx2,cy2);st=true;}else ctx.lineTo(cx2,cy2);}else st=false;}ctx.strokeStyle='#38bdf8';ctx.lineWidth=2.5;ctx.stroke();}
}

function drawSequenceVisual(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,terms=d.terms||[1,2,3,4,5],n=terms.length,gap=(w-80)/(n+1);
    if(d.title)drawText(ctx,d.title,w/2,22,'#94a3b8',12);
    for(var i=0;i<n;i++){var x=40+gap*(i+1),bH=Math.min(180,Math.abs(terms[i])*8),c=i===n-1?'#fbbf24':'#38bdf8';
    ctx.fillStyle=c;ctx.globalAlpha=0.3;ctx.fillRect(x-15,h-50-bH,30,bH);ctx.globalAlpha=1;ctx.strokeStyle=c;ctx.lineWidth=1.5;ctx.strokeRect(x-15,h-50-bH,30,bH);
    drawNumber(ctx,terms[i].toString(),x,h-50-bH-15,c,12);drawText(ctx,'a'+(i+1),x,h-32,'#64748b',10);}
}

function drawDistribution(ctx, canvas, d) {
    var w=canvas.width,h=canvas.height,px=50,py=40,pw=w-px*2,ph=h-py*2;
    drawLine(ctx,px,py+ph,px+pw,py+ph,'#475569',1.5);drawLine(ctx,px,py,px,py+ph,'#475569',1.5);
    if(d.type==='normal'||!d.bars){ctx.beginPath();var st=false;for(var x=-4;x<=4;x+=0.05){var y=Math.exp(-0.5*x*x)/Math.sqrt(2*Math.PI);var cx2=px+((x+4)/8)*pw,cy2=py+ph-(y/0.42)*ph;if(!st){ctx.moveTo(cx2,cy2);st=true;}else ctx.lineTo(cx2,cy2);}ctx.strokeStyle='#38bdf8';ctx.lineWidth=2.5;ctx.stroke();drawNumber(ctx,'\u03BC='+(d.mean||0),px+pw/2,py+ph+20,'#38bdf8',12);}
    if(d.bars){var bars=d.bars,bl=d.barLabels||[],mv=0;for(var bi=0;bi<bars.length;bi++)if(bars[bi]>mv)mv=bars[bi];if(!mv)mv=1;var bw=pw/bars.length*0.7,bg=pw/bars.length*0.3;for(var bj=0;bj<bars.length;bj++){var bx=px+bj*(bw+bg)+bg/2,bh=(bars[bj]/mv)*(ph-20);ctx.fillStyle='rgba(56,189,248,0.4)';ctx.fillRect(bx,py+ph-bh,bw,bh);ctx.strokeStyle='#38bdf8';ctx.strokeRect(bx,py+ph-bh,bw,bh);drawNumber(ctx,bars[bj].toString(),bx+bw/2,py+ph-bh-12,'#e2e8f0',10);if(bl[bj])drawText(ctx,bl[bj].toString(),bx+bw/2,py+ph+14,'#64748b',9);}}
    if(d.title)drawText(ctx,d.title,w/2,18,'#94a3b8',12);
}

function drawDefaultVisual(ctx, canvas, d) {
    drawText(ctx, d.title || 'ภาพประกอบ', canvas.width/2, canvas.height/2, '#64748b', 16);
}

/* ===== ส่วนที่ 7: Confetti ===== */

var confettiParticles = [], confettiRunning = false;

function startConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    confettiParticles = [];
    var colors = ['#38bdf8','#a78bfa','#34d399','#fbbf24','#22d3ee','#f87171'];
    for (var i = 0; i < 80; i++) {
        confettiParticles.push({
            x: Math.random()*canvas.width, y: Math.random()*canvas.height - canvas.height,
            w: randomInt(4,10), h: randomInt(4,8), color: randomChoice(colors),
            speed: randomFloat(2,5,1), spin: randomFloat(-0.1,0.1,3),
            angle: Math.random()*Math.PI*2, drift: randomFloat(-1,1,2)
        });
    }
    confettiRunning = true;
    animateConfetti(ctx, canvas);
}

function animateConfetti(ctx, canvas) {
    if (!confettiRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var alive = false;
    for (var i = 0; i < confettiParticles.length; i++) {
        var p = confettiParticles[i];
        p.y += p.speed; p.x += p.drift; p.angle += p.spin;
        if (p.y < canvas.height + 20) {
            alive = true;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
            ctx.fillStyle = p.color; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            ctx.restore();
        }
    }
    if (alive) requestAnimationFrame(function() { animateConfetti(ctx, canvas); });
    else { confettiRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* ===== ส่วนที่ 8: ระบบ UI ===== */

var currentPanel = 'home', currentChapterKey = '', currentQuestion = null;
var quizCorrect = 0, quizTotal = 0, currentStreak = 0, hasAnswered = false;

function showPanel(panelName) {
    var panels = document.querySelectorAll('.panel');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
    var target = document.getElementById('panel-' + panelName);
    if (target) target.classList.add('active');
    var navBtns = document.querySelectorAll('.nav-btn');
    for (var j = 0; j < navBtns.length; j++) navBtns[j].classList.remove('active');
    var activeNav = document.getElementById('nav-' + panelName);
    if (activeNav) activeNav.classList.add('active');
    currentPanel = panelName;
    if (panelName === 'home') updateHomeStats();
    else if (panelName === 'analytics') updateAnalyticsDashboard();
}

function updateHomeStats() {
    var stats = getOverallStats();
    document.getElementById('home-stats-total').textContent = stats.total;
    document.getElementById('home-stats-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('home-stats-streak').textContent = stats.bestStreak;
    var top = getTopBlindspots(5);
    var c = document.getElementById('home-blindspot-list');
    if (!top.length) { c.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูล เริ่มทำแบบฝึกหัดเพื่อให้ระบบวิเคราะห์จุดบอดของคุณ</p>'; return; }
    var mx = top[0].count, html = '';
    for (var i = 0; i < top.length; i++) {
        var it = top[i], tn = BLINDSPOT_TAG_NAMES[it.tag]||it.tag, pct = Math.round((it.count/mx)*100);
        html += '<div class="blindspot-item"><span class="blindspot-tag">'+tn+'</span><div class="blindspot-bar-bg"><div class="blindspot-bar-fill" style="width:'+pct+'%"></div></div><span class="blindspot-count">'+it.count+' ครั้ง</span></div>';
    }
    c.innerHTML = html;
}

function populateLevels() {
    var s = document.getElementById('select-level');
    s.innerHTML = '<option value="">-- เลือกระดับ --</option>';
    for (var lv in CURRICULUM) { var o = document.createElement('option'); o.value = lv; o.textContent = CURRICULUM[lv].name; s.appendChild(o); }
}

function onLevelChange() {
    var lv = document.getElementById('select-level').value;
    var ts = document.getElementById('select-term'), cs = document.getElementById('select-chapter'), btn = document.getElementById('btn-start-quiz');
    ts.innerHTML = '<option value="">-- เลือกภาคเรียน --</option>'; cs.innerHTML = '<option value="">-- เลือกบทเรียน --</option>';
    cs.disabled = true; btn.disabled = true;
    if (!lv) { ts.disabled = true; return; }
    ts.disabled = false;
    for (var t in CURRICULUM[lv].terms) { var o = document.createElement('option'); o.value = t; o.textContent = t; ts.appendChild(o); }
}

function onTermChange() {
    var lv = document.getElementById('select-level').value, tm = document.getElementById('select-term').value;
    var cs = document.getElementById('select-chapter'), btn = document.getElementById('btn-start-quiz');
    cs.innerHTML = '<option value="">-- เลือกบทเรียน --</option>'; btn.disabled = true;
    if (!lv || !tm) { cs.disabled = true; return; }
    cs.disabled = false;
    var chs = CURRICULUM[lv].terms[tm].chapters;
    for (var i = 0; i < chs.length; i++) { var o = document.createElement('option'); o.value = chs[i].key; o.textContent = chs[i].name; cs.appendChild(o); }
}

function onChapterChange() { document.getElementById('btn-start-quiz').disabled = !document.getElementById('select-chapter').value; }

function findChapterName(key) {
    for (var lv in CURRICULUM) { var terms = CURRICULUM[lv].terms; for (var t in terms) { var chs = terms[t].chapters; for (var i = 0; i < chs.length; i++) if (chs[i].key === key) return CURRICULUM[lv].name + ' - ' + chs[i].name; } }
    return key;
}

function startQuiz() {
    var ck = document.getElementById('select-chapter').value;
    if (!ck || !QUESTION_GENERATORS[ck]) { alert('บทเรียนนี้ยังไม่มีคำถาม'); return; }
    currentChapterKey = ck; quizCorrect = 0; quizTotal = 0; currentStreak = 0;
    document.getElementById('quiz-chapter-name').textContent = findChapterName(ck);
    updateQuizScoreDisplay(); showPanel('quiz'); generateNewQuestion();
}

function practiceWeakness() {
    var wk = getWeakestChapters();
    if (!wk.length) { alert('ยังไม่มีข้อมูลเพียงพอ ลองทำแบบฝึกหัดอย่างน้อย 2-3 บทก่อน'); return; }
    var weights = [], tw = 0;
    for (var i = 0; i < Math.min(5, wk.length); i++) { var w = 1 - wk[i].accuracy; weights.push(w); tw += w; }
    var rand = Math.random() * tw, cum = 0, chosen = wk[0].key;
    for (var j = 0; j < weights.length; j++) { cum += weights[j]; if (rand <= cum) { chosen = wk[j].key; break; } }
    if (!QUESTION_GENERATORS[chosen]) { alert('บทเรียนที่เลือกยังไม่มีคำถาม'); return; }
    currentChapterKey = chosen; quizCorrect = 0; quizTotal = 0; currentStreak = 0;
    document.getElementById('quiz-chapter-name').textContent = '[ฝึกจุดอ่อน] ' + findChapterName(chosen);
    updateQuizScoreDisplay(); showPanel('quiz'); generateNewQuestion();
}

function generateNewQuestion() {
    hasAnswered = false;
    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('solution-container').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';
    var input = document.getElementById('input-answer');
    input.value = ''; input.className = 'answer-input'; input.disabled = false; input.focus();
    document.getElementById('btn-submit').disabled = false;
    var gen = QUESTION_GENERATORS[currentChapterKey];
    if (!gen) return;
    try { currentQuestion = gen(); } catch (e) { console.log('Error:', e); document.getElementById('question-text').textContent = 'เกิดข้อผิดพลาดในการสร้างคำถาม กรุณาลองใหม่'; return; }
    document.getElementById('question-text').textContent = currentQuestion.questionText;
    if (currentQuestion.visualType && currentQuestion.visualData) {
        document.getElementById('visual-container').style.display = 'flex';
        renderVisual(currentQuestion.visualType, currentQuestion.visualData);
    } else { document.getElementById('visual-container').style.display = 'none'; }
}

function submitAnswer() {
    if (hasAnswered) return;
    var input = document.getElementById('input-answer'), txt = input.value.trim();
    if (!txt) { input.classList.add('shake-error'); setTimeout(function(){input.classList.remove('shake-error');},500); return; }
    var userAns = parseFloat(txt);
    if (isNaN(userAns)) { input.classList.add('shake-error'); setTimeout(function(){input.classList.remove('shake-error');},500); return; }
    hasAnswered = true; quizTotal++; input.disabled = true; document.getElementById('btn-submit').disabled = true;
    var tol = currentQuestion.tolerance || 0.01;
    if (Math.abs(userAns - currentQuestion.correctAnswer) <= tol) handleCorrectAnswer();
    else {
        var matched = null, traps = currentQuestion.traps || [];
        for (var i = 0; i < traps.length; i++) if (Math.abs(userAns - traps[i].answer) <= tol) { matched = traps[i]; break; }
        if (matched) handleBlindspotAnswer(matched); else handleWrongAnswer();
    }
    updateQuizScoreDisplay();
    document.getElementById('solution-container').style.display = 'block';
    document.getElementById('btn-next').style.display = 'block';
}

function handleCorrectAnswer() {
    quizCorrect++; currentStreak++;
    document.getElementById('input-answer').classList.add('correct');
    var c = document.getElementById('feedback-container'); c.style.display = 'block'; c.className = 'feedback-panel feedback-correct';
    document.getElementById('feedback-icon').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
    document.getElementById('feedback-title').textContent = 'ถูกต้อง!';
    document.getElementById('feedback-text').textContent = 'คำตอบที่ถูกต้องคือ ' + currentQuestion.correctAnswer;
    document.getElementById('feedback-detail').textContent = currentStreak > 1 ? 'ตอบถูกติดต่อกัน ' + currentStreak + ' ข้อแล้ว ทำต่อไป!' : 'ดีมาก!';
    recordAnswer(currentChapterKey, true, null); startConfetti();
    var qc = document.querySelector('.question-panel'); if(qc){qc.classList.add('glow-success');setTimeout(function(){qc.classList.remove('glow-success');},2000);}
}

function handleBlindspotAnswer(trap) {
    currentStreak = 0;
    document.getElementById('input-answer').classList.add('blindspot');
    var c = document.getElementById('feedback-container'); c.style.display = 'block'; c.className = 'feedback-panel feedback-blindspot';
    document.getElementById('feedback-icon').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    document.getElementById('feedback-title').textContent = 'ตรวจพบจุดบอด: ' + (BLINDSPOT_TAG_NAMES[trap.tag]||trap.tag);
    document.getElementById('feedback-text').textContent = trap.feedback;
    document.getElementById('feedback-detail').textContent = 'คำตอบที่ถูกต้องคือ ' + currentQuestion.correctAnswer + ' | คุณตอบ ' + document.getElementById('input-answer').value;
    recordAnswer(currentChapterKey, false, trap.tag);
    c.classList.add('blindspot-alert'); setTimeout(function(){c.classList.remove('blindspot-alert');},2000);
    var qc=document.querySelector('.question-panel');if(qc){qc.classList.add('shake-error');setTimeout(function(){qc.classList.remove('shake-error');},600);}
}

function handleWrongAnswer() {
    currentStreak = 0;
    document.getElementById('input-answer').classList.add('incorrect');
    var c = document.getElementById('feedback-container'); c.style.display = 'block'; c.className = 'feedback-panel feedback-wrong';
    document.getElementById('feedback-icon').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    document.getElementById('feedback-title').textContent = 'ไม่ถูกต้อง';
    document.getElementById('feedback-text').textContent = 'คำตอบที่ถูกต้องคือ ' + currentQuestion.correctAnswer;
    document.getElementById('feedback-detail').textContent = 'ลองดูวิธีทำด้านล่างเพื่อทำความเข้าใจ';
    recordAnswer(currentChapterKey, false, null);
    var qc=document.querySelector('.question-panel');if(qc){qc.classList.add('shake-error');setTimeout(function(){qc.classList.remove('shake-error');},600);}
}

function toggleSolution() {
    var sc = document.getElementById('solution-steps'), btn = document.getElementById('btn-show-solution');
    if (sc.style.display === 'none') {
        var steps = currentQuestion.steps || [], html = '';
        for (var i = 0; i < steps.length; i++) html += '<div class="step-item"><div class="step-number">'+(i+1)+'</div><div class="step-text">'+steps[i]+'</div></div>';
        sc.innerHTML = html; sc.style.display = 'block'; btn.textContent = 'ซ่อนวิธีทำ';
    } else { sc.style.display = 'none'; btn.textContent = 'แสดงวิธีทำ'; }
}

function nextQuestion() { generateNewQuestion(); window.scrollTo({top:0,behavior:'smooth'}); }

function updateQuizScoreDisplay() {
    document.getElementById('quiz-score-correct').textContent = quizCorrect;
    document.getElementById('quiz-score-total').textContent = quizTotal;
    document.getElementById('quiz-streak').textContent = currentStreak;
}

function updateAnalyticsDashboard() {
    var stats = getOverallStats();
    document.getElementById('analytics-total').textContent = stats.total;
    document.getElementById('analytics-correct').textContent = stats.correct;
    document.getElementById('analytics-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('analytics-best-streak').textContent = stats.bestStreak;
    var bs = getTopBlindspots(10), cc = document.getElementById('blindspot-chart');
    if (!bs.length) { cc.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูลจุดบอด</p>'; }
    else { var mx=bs[0].count,h='';for(var i=0;i<bs.length;i++){var it=bs[i],tn=BLINDSPOT_TAG_NAMES[it.tag]||it.tag,pct=Math.round((it.count/mx)*100),bc=BLINDSPOT_BAR_CLASS[it.tag]||'bar-sign';h+='<div class="chart-bar-row"><span class="chart-label">'+tn+'</span><div class="chart-bar-track"><div class="chart-bar-fill '+bc+'" style="width:'+pct+'%"><span class="chart-bar-value">'+it.count+'</span></div></div></div>';}cc.innerHTML=h; }
    var data = loadAnalytics(), sc = document.getElementById('chapter-stats-list'), entries = [];
    for (var key in data.chapterStats) { var cs=data.chapterStats[key],acc=cs.attempted>0?Math.round((cs.correct/cs.attempted)*100):0,nm='';
    for(var lv in CURRICULUM){var terms=CURRICULUM[lv].terms;for(var t in terms){var chs=terms[t].chapters;for(var ci=0;ci<chs.length;ci++)if(chs[ci].key===key)nm=chs[ci].name;}}
    entries.push({name:nm||key,accuracy:acc,attempted:cs.attempted}); }
    if (!entries.length) { sc.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูล</p>'; }
    else { entries.sort(function(a,b){return a.accuracy-b.accuracy;});var h='';for(var si=0;si<entries.length;si++){var e=entries[si],fc=e.accuracy>=70?'good':e.accuracy>=40?'medium':'bad',pc=e.accuracy>=70?'#34d399':e.accuracy>=40?'#fbbf24':'#f87171';h+='<div class="chapter-stat-item"><span class="chapter-stat-name">'+e.name+'</span><div class="chapter-stat-bar"><div class="chapter-stat-fill '+fc+'" style="width:'+e.accuracy+'%"></div></div><span class="chapter-stat-pct" style="color:'+pc+'">'+e.accuracy+'%</span></div>';}sc.innerHTML=h; }
}

function clearAllData() { document.getElementById('modal-overlay').style.display = 'flex'; }
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }
function confirmClearData() { localStorage.removeItem(STORAGE_KEY); closeModal(); updateHomeStats(); updateAnalyticsDashboard(); alert('ลบข้อมูลทั้งหมดเรียบร้อยแล้ว'); }

/* ===== ส่วนที่ 9: เริ่มต้นแอป ===== */

document.addEventListener('DOMContentLoaded', function() {
    populateLevels();
    document.getElementById('select-level').addEventListener('change', onLevelChange);
    document.getElementById('select-term').addEventListener('change', onTermChange);
    document.getElementById('select-chapter').addEventListener('change', onChapterChange);
    updateHomeStats();
});
