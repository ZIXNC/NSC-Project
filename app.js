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
/* ========== M.1 เทอม 1 ========== */

function generateQuestion_integers() {
    var types = ['add', 'subtract', 'multiply'];
    var type = randomChoice(types);
    var a = randomInt(-20, 20);
    var b = randomInt(-20, 20);
    while (b === 0) b = randomInt(-20, 20);
    var questionText, correctAnswer, traps, steps;

    if (type === 'add') {
        correctAnswer = a + b;
        questionText = 'จงหาผลลัพธ์ของ (' + a + ') + (' + b + ')';
        traps = [
            { answer: a - b, tag: 'Operation_Swap', feedback: 'คุณอาจสับสนระหว่างการบวกกับการลบ (' + a + ') + (' + b + ') ไม่ใช่ (' + a + ') - (' + b + ')' },
            { answer: -(a + b), tag: 'Sign_Error', feedback: 'ระวังเครื่องหมาย ผลบวกของ (' + a + ') + (' + b + ') ไม่ต้องกลับเครื่องหมาย' }
        ];
        if (a < 0 && b < 0) {
            traps.push({ answer: Math.abs(a) + Math.abs(b), tag: 'Sign_Error', feedback: 'จำนวนลบ + จำนวนลบ ได้ผลลัพธ์เป็นลบ ไม่ใช่บวก' });
        }
        steps = [
            'โจทย์: (' + a + ') + (' + b + ')',
            a >= 0 && b >= 0 ? 'ทั้งสองจำนวนเป็นบวก นำมาบวกกันได้เลย' : (a < 0 && b < 0 ? 'ทั้งสองจำนวนเป็นลบ นำค่าสัมบูรณ์มาบวกกัน แล้วใส่เครื่องหมายลบ' : 'เครื่องหมายต่างกัน ใช้ค่าสัมบูรณ์ที่มากกว่า ลบ ค่าสัมบูรณ์ที่น้อยกว่า แล้วใส่เครื่องหมายของจำนวนที่มีค่าสัมบูรณ์มากกว่า'),
            'ผลลัพธ์ = ' + correctAnswer
        ];
    } else if (type === 'subtract') {
        correctAnswer = a - b;
        questionText = 'จงหาผลลัพธ์ของ (' + a + ') - (' + b + ')';
        traps = [
            { answer: a + b, tag: 'Operation_Swap', feedback: 'การลบจำนวนเต็ม คือการบวกด้วยจำนวนตรงข้าม (' + a + ') - (' + b + ') = (' + a + ') + (' + (-b) + ')' },
            { answer: b - a, tag: 'Order_Error', feedback: 'ระวังลำดับ (' + a + ') - (' + b + ') ไม่เท่ากับ (' + b + ') - (' + a + ')' }
        ];
        steps = [
            'โจทย์: (' + a + ') - (' + b + ')',
            'เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม: (' + a + ') + (' + (-b) + ')',
            'คำนวณ: ' + a + ' + ' + (-b) + ' = ' + correctAnswer,
            'ผลลัพธ์ = ' + correctAnswer
        ];
    } else {
        correctAnswer = a * b;
        questionText = 'จงหาผลลัพธ์ของ (' + a + ') × (' + b + ')';
        traps = [
            { answer: a + b, tag: 'Operation_Swap', feedback: 'โจทย์ถามผลคูณ ไม่ใช่ผลบวก' },
            { answer: -(a * b), tag: 'Sign_Error', feedback: 'ระวังเครื่องหมาย: ลบ×ลบ=บวก, บวก×ลบ=ลบ, บวก×บวก=บวก' }
        ];
        steps = [
            'โจทย์: (' + a + ') × (' + b + ')',
            'หาค่าสัมบูรณ์: |' + a + '| × |' + b + '| = ' + Math.abs(a) + ' × ' + Math.abs(b) + ' = ' + Math.abs(a * b),
            'พิจารณาเครื่องหมาย: ' + (a >= 0 ? 'บวก' : 'ลบ') + ' × ' + (b >= 0 ? 'บวก' : 'ลบ') + ' = ' + (correctAnswer >= 0 ? 'บวก' : 'ลบ'),
            'ผลลัพธ์ = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { points: [a, b, correctAnswer], labels: [a.toString(), b.toString(), 'คำตอบ'], title: questionText }
    };
}

function generateQuestion_geometric_constructions() {
    var types = ['supplement', 'complement', 'bisector'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps, visualData;

    if (type === 'supplement') {
        var angle = randomInt(10, 170);
        correctAnswer = 180 - angle;
        questionText = 'มุมหนึ่งมีขนาด ' + angle + '° จงหามุมประกอบมุมตรง (supplementary angle)';
        traps = [
            { answer: 90 - angle, tag: 'Formula_Confusion', feedback: 'มุมประกอบมุมตรงรวมกันได้ 180° ไม่ใช่ 90°' },
            { answer: 360 - angle, tag: 'Formula_Confusion', feedback: 'มุมประกอบมุมตรงรวมกันได้ 180° ไม่ใช่ 360°' },
            { answer: angle, tag: 'Concept_Mix', feedback: 'มุมประกอบมุมตรง = 180° - มุมที่กำหนด ไม่ใช่มุมเดิม' }
        ];
        steps = [
            'มุมประกอบมุมตรง (supplementary) รวมกันได้ 180°',
            'มุมที่กำหนด = ' + angle + '°',
            'มุมประกอบมุมตรง = 180° - ' + angle + '° = ' + correctAnswer + '°'
        ];
        visualData = { type: 'rectangle', width: 12, height: 1, title: 'มุม ' + angle + '° กับมุมประกอบมุมตรง' };
    } else if (type === 'complement') {
        var angle2 = randomInt(5, 85);
        correctAnswer = 90 - angle2;
        questionText = 'มุมหนึ่งมีขนาด ' + angle2 + '° จงหามุมประกอบมุมฉาก (complementary angle)';
        traps = [
            { answer: 180 - angle2, tag: 'Formula_Confusion', feedback: 'มุมประกอบมุมฉากรวมกันได้ 90° ไม่ใช่ 180° (นั่นคือมุมประกอบมุมตรง)' },
            { answer: angle2, tag: 'Concept_Mix', feedback: 'มุมประกอบมุมฉาก = 90° - มุมที่กำหนด' }
        ];
        steps = [
            'มุมประกอบมุมฉาก (complementary) รวมกันได้ 90°',
            'มุมที่กำหนด = ' + angle2 + '°',
            'มุมประกอบมุมฉาก = 90° - ' + angle2 + '° = ' + correctAnswer + '°'
        ];
        visualData = { type: 'rectangle', width: 8, height: 8, title: 'มุม ' + angle2 + '° กับมุมประกอบมุมฉาก' };
    } else {
        var fullAngle = randomInt(20, 160);
        while (fullAngle % 2 !== 0) fullAngle = randomInt(20, 160);
        correctAnswer = fullAngle / 2;
        questionText = 'มุมขนาด ' + fullAngle + '° ถูกแบ่งครึ่งด้วยเส้นแบ่งครึ่งมุม จงหาขนาดของมุมที่ได้';
        traps = [
            { answer: fullAngle, tag: 'Forgot_Step', feedback: 'เส้นแบ่งครึ่งมุมจะแบ่งมุมออกเป็น 2 ส่วนเท่ากัน ต้องหาร 2' },
            { answer: fullAngle * 2, tag: 'Inverse_Error', feedback: 'ต้องหารด้วย 2 ไม่ใช่คูณ 2' }
        ];
        steps = [
            'เส้นแบ่งครึ่งมุม (angle bisector) แบ่งมุมออกเป็น 2 ส่วนเท่ากัน',
            'มุมเดิม = ' + fullAngle + '°',
            'มุมที่ได้ = ' + fullAngle + '° ÷ 2 = ' + correctAnswer + '°'
        ];
        visualData = { type: 'triangle', base: 10, triHeight: 8, title: 'เส้นแบ่งครึ่งมุม ' + fullAngle + '°' };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'shape_2d',
        visualData: visualData
    };
}

function generateQuestion_exponents() {
    var base = randomInt(2, 9);
    var exp = randomInt(2, 5);
    var correctAnswer = Math.pow(base, exp);
    var questionText = 'จงหาค่าของ ' + base + '^' + exp + ' (อ่านว่า ' + base + ' ยกกำลัง ' + exp + ')';

    var traps = [
        { answer: base * exp, tag: 'Concept_Mix', feedback: base + '^' + exp + ' หมายถึง ' + base + ' คูณกัน ' + exp + ' ครั้ง ไม่ใช่ ' + base + ' × ' + exp },
        { answer: base + exp, tag: 'Operation_Swap', feedback: 'เลขยกกำลัง คือการคูณซ้ำ ไม่ใช่การบวก' }
    ];
    if (exp >= 3) {
        traps.push({ answer: Math.pow(base, exp - 1), tag: 'Forgot_Step', feedback: 'ต้องคูณ ' + base + ' ทั้งหมด ' + exp + ' ครั้ง ไม่ใช่ ' + (exp - 1) + ' ครั้ง' });
    }

    var mulStr = '';
    for (var i = 0; i < exp; i++) { mulStr += (i > 0 ? ' × ' : '') + base; }

    var steps = [
        base + '^' + exp + ' หมายถึง ' + base + ' คูณกัน ' + exp + ' ครั้ง',
        base + '^' + exp + ' = ' + mulStr,
        'คำนวณ: ' + mulStr + ' = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { points: [correctAnswer], labels: [base + '^' + exp + ' = ' + correctAnswer], title: base + ' ยกกำลัง ' + exp }
    };
}

function generateQuestion_decimals_fractions() {
    var types = ['add_frac', 'decimal_to_frac', 'multiply_frac'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps, visualData;

    if (type === 'add_frac') {
        var d1 = randomChoice([2, 3, 4, 5, 6]);
        var d2 = randomChoice([2, 3, 4, 5, 6]);
        var n1 = randomInt(1, d1 - 1);
        var n2 = randomInt(1, d2 - 1);
        var commonD = lcm(d1, d2);
        var resultN = n1 * (commonD / d1) + n2 * (commonD / d2);
        var g = gcd(Math.abs(resultN), commonD);
        correctAnswer = roundTo(resultN / commonD, 4);
        questionText = 'จงหาผลบวก ' + n1 + '/' + d1 + ' + ' + n2 + '/' + d2 + ' (ตอบเป็นทศนิยม)';
        traps = [
            { answer: roundTo((n1 + n2) / (d1 + d2), 4), tag: 'Formula_Confusion', feedback: 'การบวกเศษส่วนต้องทำตัวส่วนให้เท่ากันก่อน ไม่ใช่บวกเศษบวกเศษ ส่วนบวกส่วน' },
            { answer: roundTo((n1 * n2) / (d1 * d2), 4), tag: 'Operation_Swap', feedback: 'โจทย์ถามผลบวก ไม่ใช่ผลคูณ' }
        ];
        steps = [
            'โจทย์: ' + n1 + '/' + d1 + ' + ' + n2 + '/' + d2,
            'หา ค.ร.น. ของ ' + d1 + ' และ ' + d2 + ' = ' + commonD,
            'ทำตัวส่วนให้เท่ากัน: ' + (n1 * (commonD / d1)) + '/' + commonD + ' + ' + (n2 * (commonD / d2)) + '/' + commonD,
            'บวกเศษ: ' + resultN + '/' + commonD + ' = ' + correctAnswer
        ];
        visualData = { numerator: resultN / g, denominator: commonD / g, title: n1 + '/' + d1 + ' + ' + n2 + '/' + d2 };
    } else if (type === 'decimal_to_frac') {
        var den = randomChoice([2, 4, 5, 8, 10]);
        var num = randomInt(1, den * 3);
        while (num % den === 0) num = randomInt(1, den * 3);
        var decimal = roundTo(num / den, 4);
        correctAnswer = decimal;
        questionText = 'จงแปลง ' + num + '/' + den + ' เป็นทศนิยม';
        var g2 = gcd(num, den);
        traps = [
            { answer: roundTo(den / num, 4), tag: 'Inverse_Error', feedback: 'ต้องนำเศษหารส่วน (' + num + ' ÷ ' + den + ') ไม่ใช่ส่วนหารเศษ' },
            { answer: num + den, tag: 'Operation_Swap', feedback: 'การแปลงเศษส่วนเป็นทศนิยม ใช้วิธีหาร ไม่ใช่บวก' }
        ];
        steps = [
            'เศษส่วน ' + num + '/' + den,
            'นำเศษหารส่วน: ' + num + ' ÷ ' + den,
            '= ' + correctAnswer
        ];
        visualData = { numerator: num, denominator: den, title: num + '/' + den + ' = ?' };
    } else {
        var d3 = randomChoice([2, 3, 4, 5]);
        var n3 = randomInt(1, d3);
        var d4 = randomChoice([2, 3, 4, 5]);
        var n4 = randomInt(1, d4);
        correctAnswer = roundTo((n3 * n4) / (d3 * d4), 4);
        questionText = 'จงหาผลคูณ ' + n3 + '/' + d3 + ' × ' + n4 + '/' + d4 + ' (ตอบเป็นทศนิยม)';
        traps = [
            { answer: roundTo((n3 + n4) / (d3 + d4), 4), tag: 'Operation_Swap', feedback: 'โจทย์ถามผลคูณ: เศษ×เศษ / ส่วน×ส่วน' },
            { answer: roundTo((n3 * n4) / (d3 + d4), 4), tag: 'Formula_Confusion', feedback: 'การคูณเศษส่วน: เศษคูณเศษ หารด้วย ส่วนคูณส่วน' }
        ];
        steps = [
            'โจทย์: ' + n3 + '/' + d3 + ' × ' + n4 + '/' + d4,
            'คูณเศษกับเศษ: ' + n3 + ' × ' + n4 + ' = ' + (n3 * n4),
            'คูณส่วนกับส่วน: ' + d3 + ' × ' + d4 + ' = ' + (d3 * d4),
            'ผลคูณ = ' + (n3 * n4) + '/' + (d3 * d4) + ' = ' + correctAnswer
        ];
        visualData = { numerator: n3, denominator: d3, title: n3 + '/' + d3 + ' × ' + n4 + '/' + d4 };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'fraction_bar',
        visualData: visualData
    };
}

function generateQuestion_shapes_2d_3d() {
    var types = ['rect_area', 'circle_area', 'tri_area'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps, visualType, visualData;

    if (type === 'rect_area') {
        var w = randomInt(3, 15);
        var h = randomInt(3, 15);
        correctAnswer = w * h;
        questionText = 'สี่เหลี่ยมผืนผ้ามีกว้าง ' + w + ' ซม. ยาว ' + h + ' ซม. จงหาพื้นที่ (ตร.ซม.)';
        traps = [
            { answer: 2 * (w + h), tag: 'Formula_Confusion', feedback: 'โจทย์ถามพื้นที่ (กว้าง × ยาว) ไม่ใช่เส้นรอบรูป 2(กว้าง + ยาว)' },
            { answer: w + h, tag: 'Operation_Swap', feedback: 'พื้นที่ = กว้าง × ยาว ไม่ใช่ กว้าง + ยาว' }
        ];
        steps = [
            'สูตรพื้นที่สี่เหลี่ยมผืนผ้า = กว้าง × ยาว',
            'พื้นที่ = ' + w + ' × ' + h,
            'พื้นที่ = ' + correctAnswer + ' ตร.ซม.'
        ];
        visualType = 'shape_2d';
        visualData = { type: 'rectangle', width: w, height: h, title: 'สี่เหลี่ยมผืนผ้า ' + w + ' × ' + h + ' ซม.' };
    } else if (type === 'circle_area') {
        var r = randomInt(2, 10);
        correctAnswer = roundTo(Math.PI * r * r, 2);
        questionText = 'วงกลมมีรัศมี ' + r + ' ซม. จงหาพื้นที่ (ตร.ซม.) ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: roundTo(2 * Math.PI * r, 2), tag: 'Formula_Confusion', feedback: 'โจทย์ถามพื้นที่ (πr²) ไม่ใช่เส้นรอบวง (2πr)' },
            { answer: roundTo(Math.PI * r, 2), tag: 'Forgot_Step', feedback: 'พื้นที่วงกลม = πr² ต้องยกกำลังสองด้วย' },
            { answer: roundTo(Math.PI * 2 * r * 2 * r, 2), tag: 'Concept_Mix', feedback: 'ใช้ r ไม่ใช่ 2r (เส้นผ่านศูนย์กลาง) ในสูตร πr²' }
        ];
        steps = [
            'สูตรพื้นที่วงกลม = πr²',
            'r = ' + r + ' ซม.',
            'พื้นที่ = π × ' + r + '² = π × ' + (r * r),
            'พื้นที่ = ' + correctAnswer + ' ตร.ซม.'
        ];
        visualType = 'shape_2d';
        visualData = { type: 'circle', radius: r, title: 'วงกลม รัศมี ' + r + ' ซม.' };
    } else {
        var base = randomInt(3, 12);
        var height = randomInt(3, 12);
        correctAnswer = roundTo((base * height) / 2, 2);
        questionText = 'สามเหลี่ยมมีฐาน ' + base + ' ซม. สูง ' + height + ' ซม. จงหาพื้นที่ (ตร.ซม.)';
        traps = [
            { answer: base * height, tag: 'Forgot_Step', feedback: 'พื้นที่สามเหลี่ยม = ½ × ฐาน × สูง อย่าลืมหาร 2' },
            { answer: base + height, tag: 'Operation_Swap', feedback: 'พื้นที่สามเหลี่ยม = ½ × ฐาน × สูง ไม่ใช่ ฐาน + สูง' }
        ];
        steps = [
            'สูตรพื้นที่สามเหลี่ยม = ½ × ฐาน × สูง',
            'พื้นที่ = ½ × ' + base + ' × ' + height,
            'พื้นที่ = ' + correctAnswer + ' ตร.ซม.'
        ];
        visualType = 'shape_2d';
        visualData = { type: 'triangle', base: base, triHeight: height, title: 'สามเหลี่ยม ฐาน ' + base + ' สูง ' + height };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: visualType,
        visualData: visualData
    };
}

/* ========== M.1 เทอม 2 ========== */

function generateQuestion_linear_equations_1() {
    var a = randomInt(2, 9);
    var b = randomInt(-10, 10);
    var x = randomInt(-10, 10);
    var c = a * x + b;
    var correctAnswer = x;
    var questionText = 'จงแก้สมการ ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' = ' + c + ' หาค่า x';

    var traps = [
        { answer: (c + b) / a, tag: 'Sign_Error', feedback: 'ย้ายข้าง ' + b + ' ต้องเปลี่ยนเครื่องหมาย: ' + c + (b >= 0 ? ' - ' : ' + ') + Math.abs(b) },
        { answer: c / a, tag: 'Forgot_Step', feedback: 'ต้องย้าย ' + b + ' ไปอีกข้างก่อน แล้วค่อยหาร ' + a }
    ];
    if (a !== 1) {
        traps.push({ answer: (c - b), tag: 'Forgot_Step', feedback: 'หลังจากย้าย ' + b + ' แล้ว ต้องหารด้วย ' + a + ' ด้วย' });
    }

    var steps = [
        'สมการ: ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' = ' + c,
        'ย้าย ' + b + ' ไปอีกข้าง: ' + a + 'x = ' + c + (b >= 0 ? ' - ' + b : ' + ' + Math.abs(b)) + ' = ' + (c - b),
        'หารทั้งสองข้างด้วย ' + a + ': x = ' + (c - b) + ' ÷ ' + a + ' = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'balance_scale',
        visualData: { left: a + 'x' + (b >= 0 ? '+' + b : b), right: c.toString(), title: 'สมการเชิงเส้นตัวแปรเดียว' }
    };
}

function generateQuestion_ratios() {
    var types = ['percentage', 'proportion', 'ratio_find'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps, visualData;

    if (type === 'percentage') {
        var pct = randomChoice([10, 15, 20, 25, 30, 40, 50, 60, 75]);
        var total = randomChoice([100, 200, 300, 400, 500, 800, 1000]);
        correctAnswer = (pct / 100) * total;
        questionText = pct + '% ของ ' + total + ' เท่ากับเท่าไร?';
        traps = [
            { answer: total / pct, tag: 'Inverse_Error', feedback: 'ต้องคูณ ไม่ใช่หาร: ' + pct + '% ของ ' + total + ' = ' + pct + '/100 × ' + total },
            { answer: pct + total, tag: 'Operation_Swap', feedback: 'ร้อยละ ต้องแปลงเป็นทศนิยมแล้วคูณ ไม่ใช่บวก' }
        ];
        steps = [
            pct + '% ของ ' + total,
            'แปลง % เป็นทศนิยม: ' + pct + '% = ' + (pct / 100),
            'คูณ: ' + (pct / 100) + ' × ' + total + ' = ' + correctAnswer
        ];
        visualData = { labels: ['ทั้งหมด', pct + '%'], values: [total, correctAnswer], title: pct + '% ของ ' + total };
    } else if (type === 'proportion') {
        var a = randomInt(2, 8);
        var b = randomInt(2, 8);
        while (b === a) b = randomInt(2, 8);
        var mult = randomInt(2, 6);
        correctAnswer = b * mult;
        questionText = 'ถ้า ' + a + ' : ' + b + ' = ' + (a * mult) + ' : x จงหาค่า x';
        traps = [
            { answer: a * mult, tag: 'Concept_Mix', feedback: 'x อยู่ในตำแหน่งของ ' + b + ' ไม่ใช่ ' + a },
            { answer: roundTo((a * mult) / b, 2), tag: 'Inverse_Error', feedback: 'ต้องหา x จากสัดส่วน: x = ' + b + ' × ' + (a * mult) + ' / ' + a }
        ];
        steps = [
            'สัดส่วน: ' + a + ' : ' + b + ' = ' + (a * mult) + ' : x',
            'ใช้สมบัติสัดส่วน: ' + a + ' × x = ' + b + ' × ' + (a * mult),
            a + 'x = ' + (b * a * mult),
            'x = ' + (b * a * mult) + ' ÷ ' + a + ' = ' + correctAnswer
        ];
        visualData = { labels: [a.toString(), b.toString(), (a * mult).toString(), 'x'], values: [a, b, a * mult, correctAnswer], title: 'สัดส่วน' };
    } else {
        var r1 = randomInt(1, 5);
        var r2 = randomInt(1, 5);
        while (r2 === r1) r2 = randomInt(1, 5);
        var totalAmt = randomChoice([60, 80, 100, 120, 150, 200]);
        correctAnswer = roundTo((r1 / (r1 + r2)) * totalAmt, 2);
        questionText = 'แบ่งเงิน ' + totalAmt + ' บาท ในอัตราส่วน ' + r1 + ' : ' + r2 + ' ส่วนแรกได้กี่บาท?';
        traps = [
            { answer: roundTo(totalAmt / r1, 2), tag: 'Formula_Confusion', feedback: 'ต้องหาร ' + totalAmt + ' ด้วยผลรวมของอัตราส่วน (' + (r1 + r2) + ') แล้วคูณด้วย ' + r1 },
            { answer: roundTo((r2 / (r1 + r2)) * totalAmt, 2), tag: 'Order_Error', feedback: 'นี่คือส่วนที่สอง ไม่ใช่ส่วนแรก' }
        ];
        steps = [
            'อัตราส่วน ' + r1 + ' : ' + r2 + ' ผลรวม = ' + (r1 + r2) + ' ส่วน',
            'แต่ละส่วน = ' + totalAmt + ' ÷ ' + (r1 + r2) + ' = ' + roundTo(totalAmt / (r1 + r2), 2) + ' บาท',
            'ส่วนแรก = ' + r1 + ' × ' + roundTo(totalAmt / (r1 + r2), 2) + ' = ' + correctAnswer + ' บาท'
        ];
        visualData = { labels: ['ส่วนที่ 1', 'ส่วนที่ 2'], values: [correctAnswer, roundTo((r2 / (r1 + r2)) * totalAmt, 2)], title: 'แบ่ง ' + totalAmt + ' ในอัตราส่วน ' + r1 + ':' + r2 };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: visualData
    };
}

function generateQuestion_graphs_linear() {
    var m = randomInt(-5, 5);
    var b = randomInt(-8, 8);
    while (m === 0) m = randomInt(-5, 5);
    var types = ['slope', 'y_intercept', 'find_y'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'slope') {
        var x1 = randomInt(-5, 0);
        var x2 = randomInt(1, 5);
        var y1 = m * x1 + b;
        var y2 = m * x2 + b;
        correctAnswer = m;
        questionText = 'จงหาความชัน (slope) ของเส้นตรงที่ผ่านจุด (' + x1 + ', ' + y1 + ') และ (' + x2 + ', ' + y2 + ')';
        traps = [
            { answer: -m, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมาย: slope = (y₂-y₁)/(x₂-x₁)' },
            { answer: roundTo((x2 - x1) / (y2 - y1), 2), tag: 'Inverse_Error', feedback: 'slope = Δy/Δx ไม่ใช่ Δx/Δy' }
        ];
        steps = [
            'สูตร slope = (y₂ - y₁) / (x₂ - x₁)',
            'slope = (' + y2 + ' - ' + (y1 >= 0 ? y1 : '(' + y1 + ')') + ') / (' + x2 + ' - ' + (x1 >= 0 ? x1 : '(' + x1 + ')') + ')',
            'slope = ' + (y2 - y1) + ' / ' + (x2 - x1) + ' = ' + m
        ];
    } else if (type === 'y_intercept') {
        correctAnswer = b;
        questionText = 'เส้นตรง y = ' + (m === 1 ? '' : m === -1 ? '-' : m) + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' ตัดแกน y ที่จุดใด? (ตอบเฉพาะค่า y)';
        traps = [
            { answer: m, tag: 'Concept_Mix', feedback: 'จุดตัดแกน y คือค่า b ใน y = mx + b ไม่ใช่ค่า m' },
            { answer: -b, tag: 'Sign_Error', feedback: 'จุดตัดแกน y = b = ' + b + ' ไม่ต้องกลับเครื่องหมาย' }
        ];
        steps = [
            'สมการ y = mx + b โดย m = ความชัน, b = จุดตัดแกน y',
            'จากสมการ y = ' + m + 'x + ' + b,
            'จุดตัดแกน y คือค่า b = ' + b
        ];
    } else {
        var xVal = randomInt(-5, 5);
        correctAnswer = m * xVal + b;
        questionText = 'ถ้า y = ' + (m === 1 ? '' : m === -1 ? '-' : m) + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' จงหาค่า y เมื่อ x = ' + xVal;
        traps = [
            { answer: m + xVal + b, tag: 'Operation_Swap', feedback: 'ต้องแทนค่า x ในสมการ: y = ' + m + '(' + xVal + ') + ' + b + ' = ' + m + ' × ' + xVal + ' + ' + b },
            { answer: m * xVal - b, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมายของ b: y = ' + m + '×' + xVal + ' + ' + b }
        ];
        steps = [
            'แทน x = ' + xVal + ' ในสมการ y = ' + m + 'x + ' + b,
            'y = ' + m + '(' + xVal + ') + ' + b,
            'y = ' + (m * xVal) + ' + ' + b + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -15, yMax: 15, lines: [{ m: m, b: b }], title: 'y = ' + m + 'x + ' + b }
    };
}

function generateQuestion_statistics_1() {
    var n = randomInt(5, 7);
    var data = [];
    for (var i = 0; i < n; i++) data.push(randomInt(1, 20));
    var sorted = data.slice().sort(function(a, b) { return a - b; });
    var sum = 0;
    for (var j = 0; j < n; j++) sum += data[j];
    var types = ['mean', 'median'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;
    var dataStr = data.join(', ');

    if (type === 'mean') {
        correctAnswer = roundTo(sum / n, 2);
        questionText = 'จงหาค่าเฉลี่ย (mean) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: sorted[Math.floor(n / 2)], tag: 'Concept_Mix', feedback: 'นี่คือมัธยฐาน (median) ไม่ใช่ค่าเฉลี่ย (mean)' },
            { answer: sum, tag: 'Forgot_Step', feedback: 'ค่าเฉลี่ย = ผลรวม ÷ จำนวนข้อมูล อย่าลืมหารด้วย ' + n }
        ];
        steps = [
            'ข้อมูล: ' + dataStr + ' (จำนวน ' + n + ' ค่า)',
            'ผลรวม = ' + data.join(' + ') + ' = ' + sum,
            'ค่าเฉลี่ย = ' + sum + ' ÷ ' + n + ' = ' + correctAnswer
        ];
    } else {
        var median;
        if (n % 2 === 1) {
            median = sorted[Math.floor(n / 2)];
        } else {
            median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
        }
        correctAnswer = roundTo(median, 2);
        questionText = 'จงหามัธยฐาน (median) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: roundTo(sum / n, 2), tag: 'Concept_Mix', feedback: 'นี่คือค่าเฉลี่ย (mean) ไม่ใช่มัธยฐาน (median)' },
            { answer: data[Math.floor(n / 2)], tag: 'Forgot_Step', feedback: 'ต้องเรียงข้อมูลจากน้อยไปมากก่อนหามัธยฐาน' }
        ];
        steps = [
            'เรียงข้อมูลจากน้อยไปมาก: ' + sorted.join(', '),
            'จำนวนข้อมูล = ' + n + ' (' + (n % 2 === 1 ? 'จำนวนคี่' : 'จำนวนคู่') + ')',
            n % 2 === 1 ? 'มัธยฐาน = ค่ากลาง = ตำแหน่งที่ ' + (Math.floor(n / 2) + 1) + ' = ' + correctAnswer : 'มัธยฐาน = (' + sorted[n / 2 - 1] + ' + ' + sorted[n / 2] + ') ÷ 2 = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: data.map(function(v, i) { return 'ค่า' + (i + 1); }), values: data, title: type === 'mean' ? 'ค่าเฉลี่ย' : 'มัธยฐาน' }
    };
}

/* ========== M.2 เทอม 1 ========== */

function generateQuestion_pythagorean() {
    var triples = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15]];
    var triple = randomChoice(triples);
    var mult = randomInt(1, 3);
    var a = triple[0] * mult, b = triple[1] * mult, c = triple[2] * mult;
    var findSide = randomChoice(['hyp', 'leg']);
    var questionText, correctAnswer, traps, steps, labels;

    if (findSide === 'hyp') {
        correctAnswer = c;
        questionText = 'สามเหลี่ยมมุมฉากมีด้านประกอบมุมฉากยาว ' + a + ' และ ' + b + ' จงหาด้านตรงข้ามมุมฉาก';
        traps = [
            { answer: a + b, tag: 'Formula_Confusion', feedback: 'ด้านตรงข้ามมุมฉาก = √(a² + b²) ไม่ใช่ a + b' },
            { answer: roundTo(Math.sqrt(a + b), 2), tag: 'Order_Error', feedback: 'ต้องยกกำลังสองก่อนบวก แล้วค่อยถอดราก: √(a² + b²)' },
            { answer: a * b, tag: 'Operation_Swap', feedback: 'ใช้สูตรพีทาโกรัส ไม่ใช่การคูณ' }
        ];
        labels = [a.toString(), b.toString(), '?'];
        steps = [
            'ทฤษฎีบทพีทาโกรัส: c² = a² + b²',
            'c² = ' + a + '² + ' + b + '² = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'c = √' + (a * a + b * b) + ' = ' + c
        ];
    } else {
        correctAnswer = a;
        questionText = 'สามเหลี่ยมมุมฉากมีด้านตรงข้ามมุมฉากยาว ' + c + ' ด้านหนึ่งยาว ' + b + ' จงหาด้านอีกด้านหนึ่ง';
        traps = [
            { answer: roundTo(Math.sqrt(c * c + b * b), 2), tag: 'Sign_Error', feedback: 'หาด้านประกอบมุมฉาก ต้องลบ ไม่ใช่บวก: √(c² - b²)' },
            { answer: c - b, tag: 'Formula_Confusion', feedback: 'ต้องยกกำลังสองก่อน: √(c² - b²) ไม่ใช่ c - b' }
        ];
        labels = ['?', b.toString(), c.toString()];
        steps = [
            'ทฤษฎีบทพีทาโกรัส: c² = a² + b² ดังนั้น a² = c² - b²',
            'a² = ' + c + '² - ' + b + '² = ' + (c * c) + ' - ' + (b * b) + ' = ' + (c * c - b * b),
            'a = √' + (c * c - b * b) + ' = ' + a
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [a, b, c], labels: labels, rightAngle: true, title: 'ทฤษฎีบทพีทาโกรัส' }
    };
}

function generateQuestion_real_numbers_intro() {
    var perfects = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
    var n = randomChoice(perfects);
    var root = Math.round(Math.sqrt(n));
    var correctAnswer = root;
    var questionText = 'จงหาค่าของ √' + n;

    var traps = [
        { answer: n / 2, tag: 'Concept_Mix', feedback: '√' + n + ' ไม่ใช่ ' + n + ' ÷ 2 แต่หมายถึงจำนวนที่ยกกำลังสองแล้วได้ ' + n },
        { answer: root + 1, tag: 'Boundary_Error', feedback: 'ลอง ' + (root + 1) + '² = ' + ((root + 1) * (root + 1)) + ' ≠ ' + n },
        { answer: root - 1, tag: 'Boundary_Error', feedback: 'ลอง ' + (root - 1) + '² = ' + ((root - 1) * (root - 1)) + ' ≠ ' + n }
    ];

    var steps = [
        '√' + n + ' คือจำนวนที่ยกกำลังสองแล้วได้ ' + n,
        'ลอง: ' + root + ' × ' + root + ' = ' + n,
        'ดังนั้น √' + n + ' = ' + root
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { points: [root], labels: ['√' + n + ' = ' + root], title: 'รากที่สอง' }
    };
}

function generateQuestion_prisms_cylinders() {
    var type = randomChoice(['cylinder_vol', 'prism_vol']);
    var questionText, correctAnswer, traps, steps, visualData;

    if (type === 'cylinder_vol') {
        var r = randomInt(2, 8);
        var h = randomInt(3, 12);
        correctAnswer = roundTo(Math.PI * r * r * h, 2);
        questionText = 'ทรงกระบอกมีรัศมี ' + r + ' ซม. สูง ' + h + ' ซม. จงหาปริมาตร (ลบ.ซม.) ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: roundTo(Math.PI * r * h, 2), tag: 'Forgot_Step', feedback: 'ปริมาตรทรงกระบอก = πr²h ต้องยกกำลังสอง r ด้วย' },
            { answer: roundTo(2 * Math.PI * r * h, 2), tag: 'Formula_Confusion', feedback: 'นี่คือพื้นที่ผิวข้าง (2πrh) ไม่ใช่ปริมาตร (πr²h)' },
            { answer: roundTo(Math.PI * 2 * r * 2 * r * h, 2), tag: 'Concept_Mix', feedback: 'ใช้ r ไม่ใช่เส้นผ่านศูนย์กลาง (2r) ในสูตร' }
        ];
        steps = [
            'สูตรปริมาตรทรงกระบอก = πr²h',
            'V = π × ' + r + '² × ' + h,
            'V = π × ' + (r * r) + ' × ' + h + ' = ' + roundTo(Math.PI * r * r * h, 2) + ' ลบ.ซม.'
        ];
        visualData = { type: 'cylinder', radius: r, height: h, title: 'ทรงกระบอก r=' + r + ' h=' + h };
    } else {
        var w = randomInt(3, 10);
        var l = randomInt(3, 10);
        var h2 = randomInt(3, 10);
        correctAnswer = w * l * h2;
        questionText = 'ปริซึมสี่เหลี่ยมมุมฉากกว้าง ' + w + ' ยาว ' + l + ' สูง ' + h2 + ' ซม. จงหาปริมาตร (ลบ.ซม.)';
        traps = [
            { answer: 2 * (w * l + l * h2 + w * h2), tag: 'Formula_Confusion', feedback: 'โจทย์ถามปริมาตร (กว้าง×ยาว×สูง) ไม่ใช่พื้นที่ผิว' },
            { answer: w + l + h2, tag: 'Operation_Swap', feedback: 'ปริมาตร = กว้าง × ยาว × สูง ไม่ใช่ผลบวก' }
        ];
        steps = [
            'สูตรปริมาตรปริซึมสี่เหลี่ยม = กว้าง × ยาว × สูง',
            'V = ' + w + ' × ' + l + ' × ' + h2,
            'V = ' + correctAnswer + ' ลบ.ซม.'
        ];
        visualData = { type: 'prism', width: w, height: h2, title: 'ปริซึม ' + w + '×' + l + '×' + h2 };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'shape_3d',
        visualData: visualData
    };
}

function generateQuestion_transformations() {
    var types = ['translate', 'reflect_x', 'reflect_y'];
    var type = randomChoice(types);
    var px = randomInt(-5, 5);
    var py = randomInt(-5, 5);
    var questionText, correctAnswer, traps, steps, pts;

    if (type === 'translate') {
        var dx = randomInt(-5, 5);
        var dy = randomInt(-5, 5);
        while (dx === 0 && dy === 0) { dx = randomInt(-5, 5); dy = randomInt(-5, 5); }
        var nx = px + dx;
        var ny = py + dy;
        correctAnswer = nx;
        questionText = 'จุด (' + px + ', ' + py + ') เลื่อนไปทางขวา ' + dx + ' หน่วย และขึ้น ' + dy + ' หน่วย จุดใหม่มีค่า x เท่ากับเท่าไร?';
        traps = [
            { answer: px - dx, tag: 'Sign_Error', feedback: 'เลื่อนไปทางขวาต้องบวก x ไม่ใช่ลบ' },
            { answer: ny, tag: 'Concept_Mix', feedback: 'โจทย์ถามค่า x ไม่ใช่ค่า y' }
        ];
        steps = [
            'จุดเดิม (' + px + ', ' + py + ')',
            'เลื่อนแกน x: ' + px + ' + ' + dx + ' = ' + nx,
            'เลื่อนแกน y: ' + py + ' + ' + dy + ' = ' + ny,
            'จุดใหม่ = (' + nx + ', ' + ny + ') ค่า x = ' + nx
        ];
        pts = [[px, py], [nx, ny]];
    } else if (type === 'reflect_x') {
        correctAnswer = -py;
        questionText = 'สะท้อนจุด (' + px + ', ' + py + ') ข้ามแกน x จุดใหม่มีค่า y เท่ากับเท่าไร?';
        traps = [
            { answer: -px, tag: 'Concept_Mix', feedback: 'สะท้อนข้ามแกน x เปลี่ยนค่า y เป็น -y ไม่ใช่เปลี่ยน x' },
            { answer: py, tag: 'Forgot_Step', feedback: 'สะท้อนข้ามแกน x ต้องเปลี่ยนเครื่องหมาย y' }
        ];
        steps = [
            'สะท้อนข้ามแกน x: (x, y) → (x, -y)',
            '(' + px + ', ' + py + ') → (' + px + ', ' + (-py) + ')',
            'ค่า y ใหม่ = ' + (-py)
        ];
        pts = [[px, py], [px, -py]];
    } else {
        correctAnswer = -px;
        questionText = 'สะท้อนจุด (' + px + ', ' + py + ') ข้ามแกน y จุดใหม่มีค่า x เท่ากับเท่าไร?';
        traps = [
            { answer: -py, tag: 'Concept_Mix', feedback: 'สะท้อนข้ามแกน y เปลี่ยนค่า x เป็น -x ไม่ใช่เปลี่ยน y' },
            { answer: px, tag: 'Forgot_Step', feedback: 'สะท้อนข้ามแกน y ต้องเปลี่ยนเครื่องหมาย x' }
        ];
        steps = [
            'สะท้อนข้ามแกน y: (x, y) → (-x, y)',
            '(' + px + ', ' + py + ') → (' + (-px) + ', ' + py + ')',
            'ค่า x ใหม่ = ' + (-px)
        ];
        pts = [[px, py], [-px, py]];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -10, yMax: 10, points: pts, title: 'การแปลงทางเรขาคณิต' }
    };
}

function generateQuestion_exponent_properties() {
    var types = ['product', 'quotient', 'power'];
    var type = randomChoice(types);
    var base = randomInt(2, 5);
    var questionText, correctAnswer, traps, steps;

    if (type === 'product') {
        var m = randomInt(2, 5);
        var n = randomInt(2, 5);
        correctAnswer = m + n;
        questionText = 'จงหาค่า n ถ้า ' + base + '^' + m + ' × ' + base + '^' + n + ' = ' + base + '^n';
        traps = [
            { answer: m * n, tag: 'Operation_Swap', feedback: 'เมื่อฐานเดียวกันคูณกัน ให้บวกเลขชี้กำลัง ไม่ใช่คูณ' },
            { answer: Math.abs(m - n), tag: 'Operation_Swap', feedback: 'a^m × a^n = a^(m+n) ไม่ใช่ a^(m-n)' }
        ];
        steps = [
            'กฎการคูณเลขยกกำลังฐานเดียวกัน: a^m × a^n = a^(m+n)',
            base + '^' + m + ' × ' + base + '^' + n + ' = ' + base + '^(' + m + '+' + n + ')',
            'n = ' + m + ' + ' + n + ' = ' + correctAnswer
        ];
    } else if (type === 'quotient') {
        var m2 = randomInt(4, 8);
        var n2 = randomInt(1, m2 - 1);
        correctAnswer = m2 - n2;
        questionText = 'จงหาค่า n ถ้า ' + base + '^' + m2 + ' ÷ ' + base + '^' + n2 + ' = ' + base + '^n';
        traps = [
            { answer: m2 + n2, tag: 'Operation_Swap', feedback: 'เมื่อฐานเดียวกันหารกัน ให้ลบเลขชี้กำลัง ไม่ใช่บวก' },
            { answer: roundTo(m2 / n2, 2), tag: 'Operation_Swap', feedback: 'a^m ÷ a^n = a^(m-n) ลบเลขชี้กำลัง ไม่ใช่หาร' }
        ];
        steps = [
            'กฎการหารเลขยกกำลังฐานเดียวกัน: a^m ÷ a^n = a^(m-n)',
            base + '^' + m2 + ' ÷ ' + base + '^' + n2 + ' = ' + base + '^(' + m2 + '-' + n2 + ')',
            'n = ' + m2 + ' - ' + n2 + ' = ' + correctAnswer
        ];
    } else {
        var m3 = randomInt(2, 4);
        var n3 = randomInt(2, 3);
        correctAnswer = m3 * n3;
        questionText = 'จงหาค่า n ถ้า (' + base + '^' + m3 + ')^' + n3 + ' = ' + base + '^n';
        traps = [
            { answer: m3 + n3, tag: 'Operation_Swap', feedback: '(a^m)^n = a^(m×n) ให้คูณเลขชี้กำลัง ไม่ใช่บวก' },
            { answer: Math.pow(m3, n3), tag: 'Concept_Mix', feedback: 'ต้องคูณเลขชี้กำลัง: m × n ไม่ใช่ m^n' }
        ];
        steps = [
            'กฎยกกำลังซ้อน: (a^m)^n = a^(m×n)',
            '(' + base + '^' + m3 + ')^' + n3 + ' = ' + base + '^(' + m3 + '×' + n3 + ')',
            'n = ' + m3 + ' × ' + n3 + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps
    };
}

function generateQuestion_polynomials() {
    var a = randomInt(1, 4);
    var b = randomInt(-5, 5);
    var c = randomInt(-5, 5);
    var xVal = randomInt(-3, 3);
    var result = a * xVal * xVal + b * xVal + c;
    var correctAnswer = result;

    var polyStr = (a === 1 ? '' : a) + 'x²' + (b >= 0 ? ' + ' + (b === 1 ? '' : b) + 'x' : ' - ' + (b === -1 ? '' : Math.abs(b)) + 'x') + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c));
    var questionText = 'ถ้า P(x) = ' + polyStr + ' จงหาค่า P(' + xVal + ')';

    var traps = [
        { answer: a * xVal + b * xVal + c, tag: 'Forgot_Step', feedback: 'ต้องยกกำลังสอง x ก่อน: P(' + xVal + ') = ' + a + '(' + xVal + ')² + ...' },
        { answer: a * xVal * xVal + b * xVal - c, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมายของค่าคงที่' },
        { answer: -(a * xVal * xVal) + b * xVal + c, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมายเมื่อแทนค่า x เป็นลบ: (-x)² = x² เป็นบวกเสมอ' }
    ];

    var steps = [
        'แทน x = ' + xVal + ' ใน P(x) = ' + polyStr,
        'P(' + xVal + ') = ' + a + '(' + xVal + ')² + ' + b + '(' + xVal + ') + ' + c,
        'P(' + xVal + ') = ' + a + '(' + (xVal * xVal) + ') + ' + (b * xVal) + ' + ' + c,
        'P(' + xVal + ') = ' + (a * xVal * xVal) + ' + ' + (b * xVal) + ' + ' + c + ' = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'function_curve',
        visualData: { xMin: -5, xMax: 5, yMin: -20, yMax: 20, coefficients: [a, b, c], points: [[xVal, result]], title: 'P(x) = ' + polyStr }
    };
}

/* ========== M.2 เทอม 2 ========== */

function generateQuestion_statistics_2() {
    var n = randomInt(6, 10);
    var data = [];
    for (var i = 0; i < n; i++) data.push(randomInt(1, 30));
    var sum = 0;
    for (var j = 0; j < n; j++) sum += data[j];
    var mean = roundTo(sum / n, 2);
    var correctAnswer = mean;
    var dataStr = data.join(', ');

    var questionText = 'จงหาค่าเฉลี่ยเลขคณิตของข้อมูลชุดนี้: ' + dataStr;
    var traps = [
        { answer: sum, tag: 'Forgot_Step', feedback: 'ค่าเฉลี่ย = ผลรวม ÷ จำนวนข้อมูล อย่าลืมหาร' },
        { answer: roundTo(sum / (n - 1), 2), tag: 'Boundary_Error', feedback: 'จำนวนข้อมูลมี ' + n + ' ค่า ไม่ใช่ ' + (n - 1) + ' ค่า' }
    ];

    var steps = [
        'ข้อมูล: ' + dataStr,
        'จำนวนข้อมูล n = ' + n,
        'ผลรวม = ' + sum,
        'ค่าเฉลี่ย = ' + sum + ' ÷ ' + n + ' = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: data.map(function(v, i) { return '' + (i + 1); }), values: data, title: 'ข้อมูล (ค่าเฉลี่ย = ?)' }
    };
}

function generateQuestion_congruence() {
    var a = randomInt(3, 10);
    var b = randomInt(3, 10);
    var c = roundTo(Math.sqrt(a * a + b * b), 2);
    var scale = 1;
    correctAnswer = b * scale;
    var questionText = 'สามเหลี่ยม ABC ≅ สามเหลี่ยม DEF โดยที่ AB = ' + a + ', BC = ' + b + ', AC = ' + c + ' ถ้า DE = ' + a + ' จงหา EF';

    var traps = [
        { answer: a, tag: 'Order_Error', feedback: 'EF ตรงกับ BC ไม่ใช่ AB ตรวจสอบลำดับตัวอักษรในความเท่ากันทุกประการ' },
        { answer: c, tag: 'Concept_Mix', feedback: 'EF ตรงกับ BC = ' + b + ' ไม่ใช่ AC' }
    ];

    var steps = [
        'สามเหลี่ยม ABC ≅ สามเหลี่ยม DEF',
        'ด้านที่สมนัยกัน: AB↔DE, BC↔EF, AC↔DF',
        'BC = ' + b + ' ดังนั้น EF = ' + b
    ];

    return {
        questionText: questionText,
        correctAnswer: b,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [a, b, c], labels: ['AB=' + a, 'BC=?', 'AC=' + c], title: 'ความเท่ากันทุกประการ' }
    };
}

function generateQuestion_parallel_lines() {
    var angle = randomInt(30, 150);
    var types = ['alternate', 'co_interior', 'corresponding'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'alternate') {
        correctAnswer = angle;
        questionText = 'เส้นขนานสองเส้นถูกตัดด้วยเส้นตัด มุมแย้ง (alternate angle) มุมหนึ่ง = ' + angle + '° จงหามุมแย้งอีกมุม';
        traps = [
            { answer: 180 - angle, tag: 'Formula_Confusion', feedback: 'มุมแย้ง (alternate angles) มีขนาดเท่ากัน ไม่ใช่ 180° - มุม' },
            { answer: 90 - angle, tag: 'Formula_Confusion', feedback: 'มุมแย้งเท่ากัน ไม่เกี่ยวกับ 90°' }
        ];
        steps = ['มุมแย้ง (alternate angles) เกิดจากเส้นขนานตัดด้วยเส้นตัด', 'มุมแย้ง มีขนาดเท่ากันเสมอ', 'มุมแย้ง = ' + angle + '°'];
    } else if (type === 'co_interior') {
        correctAnswer = 180 - angle;
        questionText = 'เส้นขนานสองเส้นถูกตัดด้วยเส้นตัด มุมร่วมภายใน (co-interior angle) มุมหนึ่ง = ' + angle + '° จงหามุมร่วมภายในอีกมุม';
        traps = [
            { answer: angle, tag: 'Concept_Mix', feedback: 'มุมร่วมภายในรวมกันได้ 180° ไม่ได้เท่ากัน' },
            { answer: 360 - angle, tag: 'Formula_Confusion', feedback: 'มุมร่วมภายในรวมกันได้ 180° ไม่ใช่ 360°' }
        ];
        steps = ['มุมร่วมภายใน (co-interior angles) เกิดจากเส้นขนานตัดด้วยเส้นตัด', 'มุมร่วมภายในรวมกันได้ 180°', 'มุมที่ต้องการ = 180° - ' + angle + '° = ' + correctAnswer + '°'];
    } else {
        correctAnswer = angle;
        questionText = 'เส้นขนานสองเส้นถูกตัดด้วยเส้นตัด มุมที่ตรงกัน (corresponding angle) มุมหนึ่ง = ' + angle + '° จงหามุมตรงกันอีกมุม';
        traps = [
            { answer: 180 - angle, tag: 'Concept_Mix', feedback: 'มุมตรงกัน (corresponding angles) มีขนาดเท่ากัน' },
            { answer: 90 - angle, tag: 'Formula_Confusion', feedback: 'มุมตรงกันเท่ากัน ไม่เกี่ยวกับ 90°' }
        ];
        steps = ['มุมตรงกัน (corresponding angles) เกิดจากเส้นขนานตัดด้วยเส้นตัด', 'มุมตรงกันมีขนาดเท่ากันเสมอ', 'มุมตรงกัน = ' + angle + '°'];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'parallel_lines',
        visualData: { angle: angle, type: type === 'alternate' ? 'มุมแย้ง' : type === 'co_interior' ? 'มุมร่วมภายใน' : 'มุมตรงกัน' }
    };
}

function generateQuestion_geometric_reasoning() {
    var types = ['angle_sum', 'exterior'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'angle_sum') {
        var a1 = randomInt(30, 80);
        var a2 = randomInt(30, 80);
        correctAnswer = 180 - a1 - a2;
        questionText = 'สามเหลี่ยมมีมุมสองมุม = ' + a1 + '° และ ' + a2 + '° จงหามุมที่สาม';
        traps = [
            { answer: 360 - a1 - a2, tag: 'Formula_Confusion', feedback: 'มุมภายในสามเหลี่ยมรวมกันได้ 180° ไม่ใช่ 360°' },
            { answer: a1 + a2, tag: 'Operation_Swap', feedback: 'ต้องใช้ 180° ลบผลรวมของสองมุมที่ทราบ' }
        ];
        steps = [
            'ผลรวมมุมภายในของสามเหลี่ยม = 180°',
            'มุมที่สาม = 180° - ' + a1 + '° - ' + a2 + '°',
            'มุมที่สาม = ' + correctAnswer + '°'
        ];
    } else {
        var intAngle = randomInt(30, 80);
        var adjAngle = randomInt(30, 80);
        var extAngle = intAngle + adjAngle;
        correctAnswer = extAngle;
        questionText = 'สามเหลี่ยมมีมุมภายในสองมุม (ไม่อยู่ติดมุมภายนอก) = ' + intAngle + '° และ ' + adjAngle + '° จงหามุมภายนอก';
        traps = [
            { answer: 180 - intAngle - adjAngle, tag: 'Concept_Mix', feedback: 'นี่คือมุมภายในที่สาม ไม่ใช่มุมภายนอก มุมภายนอก = ผลรวมของสองมุมภายในที่ไม่ติดกัน' },
            { answer: 180 - extAngle, tag: 'Inverse_Error', feedback: 'มุมภายนอก = ผลรวมของ 2 มุมภายในที่ไม่ติดกัน' }
        ];
        steps = [
            'มุมภายนอกของสามเหลี่ยม = ผลรวมของมุมภายในสองมุมที่ไม่ติดกัน',
            'มุมภายนอก = ' + intAngle + '° + ' + adjAngle + '°',
            'มุมภายนอก = ' + correctAnswer + '°'
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [6, 8, 7], title: type === 'angle_sum' ? 'ผลรวมมุมภายใน' : 'มุมภายนอก' }
    };
}

function generateQuestion_factoring_2() {
    var r1 = randomInt(-9, 9);
    var r2 = randomInt(-9, 9);
    while (r2 === 0 && r1 === 0) { r1 = randomInt(-9, 9); r2 = randomInt(-9, 9); }
    var b = -(r1 + r2);
    var c = r1 * r2;
    var sum = r1 + r2;
    var correctAnswer = sum;

    var polyStr = 'x²' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + 'x' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c));
    var questionText = 'จงแยกตัวประกอบ ' + polyStr + ' = (x + a)(x + b) จงหาค่า a + b';

    var traps = [
        { answer: b, tag: 'Sign_Error', feedback: 'ระวัง: ถ้า x² + Bx + C = (x - r₁)(x - r₂) แล้ว B = -(r₁+r₂) ดังนั้น a+b = -(B)' },
        { answer: c, tag: 'Concept_Mix', feedback: 'ค่า a+b มาจากสัมประสิทธิ์ของ x ไม่ใช่ค่าคงที่' },
        { answer: r1 * r2, tag: 'Concept_Mix', feedback: 'โจทย์ถาม a+b ไม่ใช่ a×b' }
    ];

    var steps = [
        'พหุนาม: ' + polyStr,
        'หาจำนวนสองจำนวนที่คูณกันได้ ' + c + ' และบวกกันได้ ' + (-b),
        'จำนวนคือ ' + r1 + ' และ ' + r2,
        polyStr + ' = (x' + (r1 >= 0 ? ' - ' + r1 : ' + ' + Math.abs(r1)) + ')(x' + (r2 >= 0 ? ' - ' + r2 : ' + ' + Math.abs(r2)) + ')',
        'a + b = ' + (-r1) + ' + ' + (-r2) + ' = ' + sum
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps
    };
}


/* ========== M.3 เทอม 1 ========== */

function generateQuestion_linear_inequalities() {
    var a = randomInt(2, 8);
    var b = randomInt(-10, 10);
    var c = randomInt(-15, 15);
    var neg = randomChoice([true, false]);
    if (neg) a = -a;
    var rhs = c - b;
    var correctAnswer = roundTo(rhs / a, 2);
    var sign = a > 0 ? '>' : '<';
    var questionText = 'จงแก้อสมการ ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' > ' + c + ' จงหาค่าวิกฤต (boundary) ของ x';

    var traps = [
        { answer: roundTo((c + b) / a, 2), tag: 'Sign_Error', feedback: 'เมื่อย้ายข้าง ' + b + ' ต้องเปลี่ยนเครื่องหมาย' },
        { answer: roundTo(c / a, 2), tag: 'Forgot_Step', feedback: 'ต้องย้าย ' + b + ' ไปอีกข้างก่อนหาร' }
    ];
    if (a < 0) {
        traps.push({ answer: -correctAnswer, tag: 'Sign_Error', feedback: 'เมื่อหารด้วยจำนวนลบ ต้องกลับเครื่องหมายอสมการ และค่าวิกฤตยังเท่าเดิม' });
    }

    var steps = [
        'อสมการ: ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' > ' + c,
        'ย้าย ' + b + ': ' + a + 'x > ' + c + (b >= 0 ? ' - ' + b : ' + ' + Math.abs(b)) + ' = ' + rhs,
        'หารด้วย ' + a + ': x ' + sign + ' ' + correctAnswer + (a < 0 ? ' (กลับเครื่องหมายเพราะหารด้วยจำนวนลบ)' : ''),
        'ค่าวิกฤต = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { points: [correctAnswer], labels: ['x = ' + correctAnswer], title: 'อสมการเชิงเส้น' }
    };
}

function generateQuestion_factoring_higher() {
    var types = ['sum_cubes', 'diff_cubes', 'common_factor'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'sum_cubes') {
        var a = randomInt(1, 4);
        var b = randomInt(1, 4);
        var a3 = a * a * a;
        var b3 = b * b * b;
        correctAnswer = a3 + b3;
        questionText = 'จงหาค่าของ ' + a + '³ + ' + b + '³';
        traps = [
            { answer: (a + b) * (a + b) * (a + b), tag: 'Formula_Confusion', feedback: 'a³ + b³ ≠ (a+b)³ สูตร: a³+b³ = (a+b)(a²-ab+b²)' },
            { answer: a3 - b3, tag: 'Sign_Error', feedback: 'โจทย์ถามผลรวม a³ + b³ ไม่ใช่ผลต่าง' }
        ];
        steps = [
            a + '³ + ' + b + '³',
            '= ' + a3 + ' + ' + b3,
            '= ' + correctAnswer,
            'หรือใช้สูตร: (' + a + '+' + b + ')(' + a + '²-' + a + '·' + b + '+' + b + '²) = ' + (a + b) + '·' + (a * a - a * b + b * b) + ' = ' + correctAnswer
        ];
    } else if (type === 'diff_cubes') {
        var a2 = randomInt(2, 5);
        var b2 = randomInt(1, a2 - 1);
        var a2_3 = a2 * a2 * a2;
        var b2_3 = b2 * b2 * b2;
        correctAnswer = a2_3 - b2_3;
        questionText = 'จงหาค่าของ ' + a2 + '³ - ' + b2 + '³';
        traps = [
            { answer: (a2 - b2) * (a2 - b2) * (a2 - b2), tag: 'Formula_Confusion', feedback: 'a³ - b³ ≠ (a-b)³ สูตร: a³-b³ = (a-b)(a²+ab+b²)' },
            { answer: a2_3 + b2_3, tag: 'Sign_Error', feedback: 'โจทย์ถามผลต่าง ไม่ใช่ผลรวม' }
        ];
        steps = [
            a2 + '³ - ' + b2 + '³',
            '= ' + a2_3 + ' - ' + b2_3,
            '= ' + correctAnswer
        ];
    } else {
        var cf = randomInt(2, 5);
        var p = randomInt(1, 5);
        var q = randomInt(1, 5);
        correctAnswer = cf * (p + q);
        questionText = 'จงหาค่าของ ' + (cf * p) + ' + ' + (cf * q) + ' โดยใช้การดึงตัวร่วม (ค่าตัวร่วมคือ ' + cf + ')';
        traps = [
            { answer: cf * p * q, tag: 'Operation_Swap', feedback: 'ต้องบวก ไม่ใช่คูณ: ' + cf + '(' + p + ' + ' + q + ')' },
            { answer: p + q, tag: 'Forgot_Step', feedback: 'อย่าลืมคูณตัวร่วม ' + cf + ' กลับ' }
        ];
        steps = [
            (cf * p) + ' + ' + (cf * q),
            '= ' + cf + '·' + p + ' + ' + cf + '·' + q,
            '= ' + cf + '(' + p + ' + ' + q + ') = ' + cf + '·' + (p + q) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps
    };
}

function generateQuestion_quadratic_equations() {
    var r1 = randomInt(-8, 8);
    var r2 = randomInt(-8, 8);
    while (r1 === 0 && r2 === 0) { r1 = randomInt(-8, 8); r2 = randomInt(-8, 8); }
    var a = 1;
    var b = -(r1 + r2);
    var c = r1 * r2;
    var types = ['sum', 'product', 'larger_root'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;
    var eqStr = 'x²' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + 'x' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + ' = 0';

    if (type === 'sum') {
        correctAnswer = r1 + r2;
        questionText = 'สมการ ' + eqStr + ' จงหาผลบวกของรากทั้งสอง';
        traps = [
            { answer: b, tag: 'Sign_Error', feedback: 'ผลรวมของราก = -b/a = ' + (-b) + ' ไม่ใช่ b' },
            { answer: r1 * r2, tag: 'Concept_Mix', feedback: 'โจทย์ถามผลบวกของราก ไม่ใช่ผลคูณ' }
        ];
        steps = [
            'สมการ: ' + eqStr,
            'จากสูตรวิเอต: ผลรวมของราก = -b/a = ' + (-(b)) + '/' + a,
            'ผลรวมของราก = ' + correctAnswer
        ];
    } else if (type === 'product') {
        correctAnswer = r1 * r2;
        questionText = 'สมการ ' + eqStr + ' จงหาผลคูณของรากทั้งสอง';
        traps = [
            { answer: r1 + r2, tag: 'Concept_Mix', feedback: 'โจทย์ถามผลคูณ ไม่ใช่ผลบวก' },
            { answer: -c, tag: 'Sign_Error', feedback: 'ผลคูณของราก = c/a = ' + c }
        ];
        steps = [
            'สมการ: ' + eqStr,
            'จากสูตรวิเอต: ผลคูณของราก = c/a = ' + c + '/' + a,
            'ผลคูณของราก = ' + correctAnswer
        ];
    } else {
        correctAnswer = Math.max(r1, r2);
        questionText = 'สมการ ' + eqStr + ' จงหารากที่มากกว่า';
        traps = [
            { answer: Math.min(r1, r2), tag: 'Order_Error', feedback: 'โจทย์ถามรากที่มากกว่า ค่านี้คือรากที่น้อยกว่า' },
            { answer: r1 + r2, tag: 'Concept_Mix', feedback: 'โจทย์ถามรากที่มากกว่า ไม่ใช่ผลรวมของราก' }
        ];
        steps = [
            'สมการ: ' + eqStr,
            'แยกตัวประกอบ: (x - ' + r1 + ')(x - ' + r2 + ') = 0',
            'ราก: x = ' + r1 + ' หรือ x = ' + r2,
            'รากที่มากกว่า = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'function_curve',
        visualData: { xMin: -10, xMax: 10, yMin: -20, yMax: 20, coefficients: [1, b, c], points: [[r1, 0], [r2, 0]], title: eqStr }
    };
}

function generateQuestion_similarity() {
    var a = randomInt(3, 8);
    var b = randomInt(3, 8);
    while (b === a) b = randomInt(3, 8);
    var k = randomChoice([2, 3, 4]);
    var bigA = a * k;
    var bigB = b * k;
    var findBig = randomChoice([true, false]);
    var questionText, correctAnswer, traps, steps;

    if (findBig) {
        correctAnswer = bigB;
        questionText = 'สามเหลี่ยม ABC คล้ายกับสามเหลี่ยม DEF โดย AB = ' + a + ', BC = ' + b + ', DE = ' + bigA + ' จงหา EF';
        traps = [
            { answer: b + (bigA - a), tag: 'Formula_Confusion', feedback: 'ใช้อัตราส่วน ไม่ใช่ผลต่าง: EF/BC = DE/AB' },
            { answer: roundTo(a * b / bigA, 2), tag: 'Inverse_Error', feedback: 'ต้องคูณอัตราส่วน ไม่ใช่หาร' }
        ];
        steps = [
            'สามเหลี่ยมคล้าย → ด้านสมนัยเป็นสัดส่วนกัน',
            'AB/DE = BC/EF → ' + a + '/' + bigA + ' = ' + b + '/EF',
            'EF = ' + b + ' × ' + bigA + ' / ' + a + ' = ' + correctAnswer
        ];
    } else {
        correctAnswer = b;
        questionText = 'สามเหลี่ยม ABC คล้ายกับสามเหลี่ยม DEF โดย DE = ' + bigA + ', EF = ' + bigB + ', AB = ' + a + ' จงหา BC';
        traps = [
            { answer: bigB - bigA + a, tag: 'Formula_Confusion', feedback: 'ใช้อัตราส่วน ไม่ใช่ผลต่าง' },
            { answer: roundTo(bigA * bigB / a, 2), tag: 'Inverse_Error', feedback: 'ตรวจสอบอัตราส่วน: BC/EF = AB/DE' }
        ];
        steps = [
            'สามเหลี่ยมคล้าย → ด้านสมนัยเป็นสัดส่วนกัน',
            'AB/DE = BC/EF → ' + a + '/' + bigA + ' = BC/' + bigB,
            'BC = ' + a + ' × ' + bigB + ' / ' + bigA + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [a, b, roundTo(Math.sqrt(a * a + b * b), 1)], title: 'ความคล้าย (อัตราส่วน 1:' + k + ')' }
    };
}

function generateQuestion_quadratic_graphs() {
    var a = randomChoice([-2, -1, 1, 2]);
    var h = randomInt(-5, 5);
    var k = randomInt(-8, 8);
    var b = -2 * a * h;
    var c = a * h * h + k;
    var correctAnswer, questionText, traps, steps;
    var type = randomChoice(['vertex_x', 'vertex_y', 'direction']);

    if (type === 'vertex_x') {
        correctAnswer = h;
        questionText = 'พาราโบลา y = ' + a + 'x²' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + 'x' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + ' มีจุดยอดที่ x เท่าไร?';
        traps = [
            { answer: -h, tag: 'Sign_Error', feedback: 'x ของจุดยอด = -b/(2a) = ' + h },
            { answer: roundTo(b / (2 * a), 2), tag: 'Sign_Error', feedback: 'สูตรคือ -b/(2a) ไม่ใช่ b/(2a) อย่าลืมเครื่องหมายลบ' }
        ];
        steps = [
            'สูตรจุดยอด: x = -b/(2a)',
            'a = ' + a + ', b = ' + b,
            'x = -(' + b + ')/(2×' + a + ') = ' + (-b) + '/' + (2 * a) + ' = ' + h
        ];
    } else if (type === 'vertex_y') {
        correctAnswer = k;
        questionText = 'พาราโบลา y = ' + a + '(x - ' + h + ')² + ' + k + ' มีจุดยอดที่ y เท่าไร?';
        traps = [
            { answer: h, tag: 'Concept_Mix', feedback: 'โจทย์ถามค่า y ของจุดยอด (ค่า k) ไม่ใช่ค่า x (ค่า h)' },
            { answer: -k, tag: 'Sign_Error', feedback: 'จากรูป y = a(x-h)²+k จุดยอดอยู่ที่ (h, k) ค่า y = k = ' + k }
        ];
        steps = [
            'รูปมาตรฐาน: y = a(x - h)² + k',
            'จุดยอดอยู่ที่ (h, k) = (' + h + ', ' + k + ')',
            'ค่า y ของจุดยอด = ' + k
        ];
    } else {
        correctAnswer = a > 0 ? 1 : -1;
        questionText = 'พาราโบลา y = ' + a + 'x²' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + 'x' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + ' เปิดขึ้นหรือเปิดลง? (ตอบ 1 = เปิดขึ้น, -1 = เปิดลง)';
        traps = [
            { answer: -correctAnswer, tag: 'Sign_Error', feedback: 'ถ้า a > 0 พาราโบลาเปิดขึ้น ถ้า a < 0 เปิดลง' }
        ];
        steps = [
            'สัมประสิทธิ์ a = ' + a,
            a > 0 ? 'a > 0 ดังนั้นพาราโบลาเปิดขึ้น (1)' : 'a < 0 ดังนั้นพาราโบลาเปิดลง (-1)',
            'คำตอบ = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -15, yMax: 15, parabola: { a: a, b: b, c: c }, points: [[h, k]], title: 'พาราโบลา' }
    };
}

function generateQuestion_statistics_3() {
    var n = randomInt(4, 6);
    var data = [];
    for (var i = 0; i < n; i++) data.push(randomInt(2, 20));
    var sum = 0;
    for (var j = 0; j < n; j++) sum += data[j];
    var mean = sum / n;
    var sumSqDiff = 0;
    for (var k2 = 0; k2 < n; k2++) sumSqDiff += (data[k2] - mean) * (data[k2] - mean);
    var variance = sumSqDiff / n;
    var sd = Math.sqrt(variance);
    var type = randomChoice(['variance', 'sd']);
    var correctAnswer, questionText, traps, steps;
    var dataStr = data.join(', ');

    if (type === 'variance') {
        correctAnswer = roundTo(variance, 2);
        questionText = 'จงหาความแปรปรวน (variance) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: roundTo(sd, 2), tag: 'Concept_Mix', feedback: 'นี่คือส่วนเบี่ยงเบนมาตรฐาน (SD) ไม่ใช่ความแปรปรวน ความแปรปรวน = SD²' },
            { answer: roundTo(sumSqDiff / (n - 1), 2), tag: 'Boundary_Error', feedback: 'ใช้ n ไม่ใช่ n-1 ในความแปรปรวนประชากร' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr,
            'ค่าเฉลี่ย = ' + roundTo(mean, 2),
            'ผลรวม (xᵢ - x̄)² = ' + roundTo(sumSqDiff, 2),
            'ความแปรปรวน = ' + roundTo(sumSqDiff, 2) + ' ÷ ' + n + ' = ' + correctAnswer
        ];
    } else {
        correctAnswer = roundTo(sd, 2);
        questionText = 'จงหาส่วนเบี่ยงเบนมาตรฐาน (SD) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: roundTo(variance, 2), tag: 'Forgot_Step', feedback: 'SD = √(ความแปรปรวน) ต้องถอดรากที่สองด้วย' },
            { answer: roundTo(Math.sqrt(sumSqDiff / (n - 1)), 2), tag: 'Boundary_Error', feedback: 'ใช้ n ในการหาร ไม่ใช่ n-1 สำหรับ SD ประชากร' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr,
            'ค่าเฉลี่ย = ' + roundTo(mean, 2),
            'ความแปรปรวน = ' + roundTo(variance, 2),
            'SD = √' + roundTo(variance, 2) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.05,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: data.map(function(v, i) { return '' + (i + 1); }), values: data, title: 'ข้อมูล' }
    };
}

/* ========== M.3 เทอม 2 ========== */

function generateQuestion_systems_linear() {
    var x = randomInt(-5, 5);
    var y = randomInt(-5, 5);
    var a1 = randomInt(1, 4);
    var b1 = randomInt(-4, 4);
    while (b1 === 0) b1 = randomInt(-4, 4);
    var c1 = a1 * x + b1 * y;
    var a2 = randomInt(-4, 4);
    var b2 = randomInt(1, 4);
    while (a1 * b2 === a2 * b1) { a2 = randomInt(-4, 4); b2 = randomInt(1, 4); }
    var c2 = a2 * x + b2 * y;
    var ask = randomChoice(['x', 'y', 'sum']);
    var correctAnswer, questionText;

    if (ask === 'x') { correctAnswer = x; }
    else if (ask === 'y') { correctAnswer = y; }
    else { correctAnswer = x + y; }

    var eq1 = a1 + 'x' + (b1 >= 0 ? ' + ' + b1 : ' - ' + Math.abs(b1)) + 'y = ' + c1;
    var eq2 = a2 + 'x' + (b2 >= 0 ? ' + ' + b2 : ' - ' + Math.abs(b2)) + 'y = ' + c2;
    var askStr = ask === 'x' ? 'ค่า x' : ask === 'y' ? 'ค่า y' : 'ค่า x + y';
    questionText = 'ระบบสมการ: ' + eq1 + ' และ ' + eq2 + ' จงหา' + askStr;

    var traps = [
        { answer: ask === 'x' ? y : x, tag: 'Concept_Mix', feedback: 'ตรวจสอบว่าตอบค่าตัวแปรที่ถูกต้อง' },
        { answer: -(correctAnswer), tag: 'Sign_Error', feedback: 'ระวังเครื่องหมายในการแก้สมการ' }
    ];

    var steps = [
        'สมการที่ 1: ' + eq1,
        'สมการที่ 2: ' + eq2,
        'แก้ระบบสมการได้ x = ' + x + ', y = ' + y,
        askStr + ' = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: {
            xMin: -10, xMax: 10, yMin: -10, yMax: 10,
            lines: [
                { m: -a1 / b1, b: c1 / b1 },
                { m: -a2 / b2, b: c2 / b2 }
            ],
            points: [[x, y]],
            title: 'ระบบสมการ'
        }
    };
}

function generateQuestion_circles() {
    var types = ['arc_length', 'sector_area', 'central_angle'];
    var type = randomChoice(types);
    var r = randomInt(3, 12);
    var angle = randomChoice([30, 45, 60, 90, 120, 150, 180]);
    var questionText, correctAnswer, traps, steps;

    if (type === 'arc_length') {
        correctAnswer = roundTo((angle / 360) * 2 * Math.PI * r, 2);
        questionText = 'วงกลมรัศมี ' + r + ' ซม. จงหาความยาวส่วนโค้งที่รองรับมุม ' + angle + '° (ตอบทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo((angle / 360) * Math.PI * r * r, 2), tag: 'Formula_Confusion', feedback: 'นี่คือพื้นที่เซกเตอร์ ไม่ใช่ความยาวส่วนโค้ง ความยาวส่วนโค้ง = (θ/360)×2πr' },
            { answer: roundTo(2 * Math.PI * r, 2), tag: 'Forgot_Step', feedback: 'ต้องคูณด้วย θ/360 เพราะเป็นแค่ส่วนหนึ่งของวง' }
        ];
        steps = [
            'สูตรความยาวส่วนโค้ง = (θ/360) × 2πr',
            '= (' + angle + '/360) × 2π × ' + r,
            '= ' + roundTo(angle / 360, 4) + ' × ' + roundTo(2 * Math.PI * r, 2),
            '= ' + correctAnswer + ' ซม.'
        ];
    } else if (type === 'sector_area') {
        correctAnswer = roundTo((angle / 360) * Math.PI * r * r, 2);
        questionText = 'วงกลมรัศมี ' + r + ' ซม. จงหาพื้นที่เซกเตอร์ที่มีมุม ' + angle + '° (ตอบทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo((angle / 360) * 2 * Math.PI * r, 2), tag: 'Formula_Confusion', feedback: 'นี่คือความยาวส่วนโค้ง ไม่ใช่พื้นที่ พื้นที่เซกเตอร์ = (θ/360)×πr²' },
            { answer: roundTo(Math.PI * r * r, 2), tag: 'Forgot_Step', feedback: 'ต้องคูณด้วย θ/360' }
        ];
        steps = [
            'สูตรพื้นที่เซกเตอร์ = (θ/360) × πr²',
            '= (' + angle + '/360) × π × ' + r + '²',
            '= ' + roundTo(angle / 360, 4) + ' × ' + roundTo(Math.PI * r * r, 2),
            '= ' + correctAnswer + ' ตร.ซม.'
        ];
    } else {
        var arcLen = roundTo((angle / 360) * 2 * Math.PI * r, 2);
        correctAnswer = angle;
        questionText = 'วงกลมรัศมี ' + r + ' ซม. มีส่วนโค้งยาว ' + arcLen + ' ซม. จงหามุมที่จุดศูนย์กลาง (องศา)';
        traps = [
            { answer: 360 - angle, tag: 'Concept_Mix', feedback: 'นี่คือมุมรีเฟล็กซ์ ไม่ใช่มุมที่ต้องการ' },
            { answer: roundTo(arcLen / r, 2), tag: 'Unit_Confusion', feedback: 'นี่คือมุมในหน่วยเรเดียน ไม่ใช่องศา' }
        ];
        steps = [
            'ส่วนโค้ง = (θ/360) × 2πr',
            arcLen + ' = (θ/360) × 2π × ' + r,
            'θ = ' + arcLen + ' × 360 / (2π × ' + r + ')',
            'θ = ' + angle + '°'
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.1,
        traps: traps,
        steps: steps,
        visualType: 'circle_diagram',
        visualData: { radius: r, angle: angle, title: 'วงกลม r = ' + r }
    };
}

function generateQuestion_pyramids_cones_spheres() {
    var type = randomChoice(['pyramid', 'cone', 'sphere']);
    var questionText, correctAnswer, traps, steps, visualData;

    if (type === 'pyramid') {
        var base = randomInt(3, 10);
        var h = randomInt(4, 12);
        correctAnswer = roundTo((base * base * h) / 3, 2);
        questionText = 'พีระมิดฐานสี่เหลี่ยมจัตุรัสกว้าง ' + base + ' ซม. สูง ' + h + ' ซม. จงหาปริมาตร (ลบ.ซม.)';
        traps = [
            { answer: base * base * h, tag: 'Forgot_Step', feedback: 'ปริมาตรพีระมิด = ⅓ × พื้นที่ฐาน × สูง อย่าลืมหาร 3' },
            { answer: roundTo((base * h) / 3, 2), tag: 'Forgot_Step', feedback: 'พื้นที่ฐาน = ด้าน² = ' + (base * base) + ' ไม่ใช่ ' + base }
        ];
        steps = [
            'สูตร V = ⅓ × พื้นที่ฐาน × สูง',
            'พื้นที่ฐาน = ' + base + '² = ' + (base * base),
            'V = ⅓ × ' + (base * base) + ' × ' + h + ' = ' + correctAnswer + ' ลบ.ซม.'
        ];
        visualData = { type: 'pyramid', height: h, title: 'พีระมิด ฐาน=' + base + ' สูง=' + h };
    } else if (type === 'cone') {
        var r = randomInt(2, 8);
        var h2 = randomInt(4, 12);
        correctAnswer = roundTo((Math.PI * r * r * h2) / 3, 2);
        questionText = 'กรวยมีรัศมี ' + r + ' ซม. สูง ' + h2 + ' ซม. จงหาปริมาตร (ลบ.ซม.) ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: roundTo(Math.PI * r * r * h2, 2), tag: 'Forgot_Step', feedback: 'ปริมาตรกรวย = ⅓πr²h อย่าลืมหาร 3' },
            { answer: roundTo((Math.PI * r * h2) / 3, 2), tag: 'Forgot_Step', feedback: 'ต้องยกกำลังสอง r: ⅓πr²h' }
        ];
        steps = [
            'สูตร V = ⅓πr²h',
            'V = ⅓ × π × ' + r + '² × ' + h2,
            'V = ⅓ × π × ' + (r * r) + ' × ' + h2 + ' = ' + correctAnswer + ' ลบ.ซม.'
        ];
        visualData = { type: 'cone', radius: r, height: h2, title: 'กรวย r=' + r + ' h=' + h2 };
    } else {
        var r2 = randomInt(2, 8);
        correctAnswer = roundTo((4 / 3) * Math.PI * r2 * r2 * r2, 2);
        questionText = 'ทรงกลมมีรัศมี ' + r2 + ' ซม. จงหาปริมาตร (ลบ.ซม.) ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: roundTo(4 * Math.PI * r2 * r2, 2), tag: 'Formula_Confusion', feedback: 'นี่คือพื้นที่ผิว (4πr²) ไม่ใช่ปริมาตร (⁴⁄₃πr³)' },
            { answer: roundTo(Math.PI * r2 * r2 * r2, 2), tag: 'Forgot_Step', feedback: 'อย่าลืมคูณ 4/3' }
        ];
        steps = [
            'สูตร V = ⁴⁄₃πr³',
            'V = ⁴⁄₃ × π × ' + r2 + '³',
            'V = ⁴⁄₃ × π × ' + (r2 * r2 * r2) + ' = ' + correctAnswer + ' ลบ.ซม.'
        ];
        visualData = { type: 'sphere', radius: r2, title: 'ทรงกลม r=' + r2 };
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.1,
        traps: traps,
        steps: steps,
        visualType: 'shape_3d',
        visualData: visualData
    };
}

function generateQuestion_probability_1() {
    var types = ['dice', 'cards', 'balls'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps, branches;

    if (type === 'dice') {
        var target = randomInt(1, 6);
        correctAnswer = roundTo(1 / 6, 4);
        questionText = 'ทอดลูกเต๋า 1 ลูก จงหาความน่าจะเป็นที่จะได้แต้ม ' + target + ' (ตอบทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(target / 6, 4), tag: 'Concept_Mix', feedback: 'ความน่าจะเป็น = จำนวนผลลัพธ์ที่ต้องการ / จำนวนผลลัพธ์ทั้งหมด = 1/6' },
            { answer: roundTo(5 / 6, 4), tag: 'Concept_Mix', feedback: 'นี่คือความน่าจะเป็นที่จะไม่ได้ ' + target + ' (complement)' }
        ];
        steps = [
            'ลูกเต๋ามี 6 หน้า',
            'ผลลัพธ์ที่ต้องการ = {' + target + '} มี 1 แบบ',
            'P = 1/6 = ' + roundTo(1 / 6, 4)
        ];
        branches = ['1', '2', '3', '4', '5', '6'];
    } else if (type === 'cards') {
        var suit = randomChoice(['โพดำ', 'โพแดง', 'ข้าวหลามตัด', 'ดอกจิก']);
        correctAnswer = roundTo(13 / 52, 4);
        questionText = 'สุ่มหยิบไพ่ 1 ใบจากสำรับ 52 ใบ จงหาความน่าจะเป็นที่จะได้ไพ่' + suit + ' (ตอบทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(1 / 52, 4), tag: 'Concept_Mix', feedback: 'แต่ละสี (suit) มี 13 ใบ ไม่ใช่ 1 ใบ' },
            { answer: roundTo(4 / 52, 4), tag: 'Concept_Mix', feedback: '4/52 คือความน่าจะเป็นของแต้มเดียว (เช่น A ทุกสี) ไม่ใช่ทั้ง suit' }
        ];
        steps = [
            'ไพ่ทั้งหมด 52 ใบ มี 4 สี สีละ 13 ใบ',
            'จำนวนไพ่' + suit + ' = 13 ใบ',
            'P = 13/52 = 1/4 = ' + roundTo(13 / 52, 4)
        ];
        branches = ['โพดำ(13)', 'โพแดง(13)', 'ข้าวหลามตัด(13)', 'ดอกจิก(13)'];
    } else {
        var red = randomInt(2, 6);
        var blue = randomInt(2, 6);
        var total = red + blue;
        var pickColor = randomChoice(['แดง', 'น้ำเงิน']);
        var pick = pickColor === 'แดง' ? red : blue;
        correctAnswer = roundTo(pick / total, 4);
        questionText = 'กล่องมีลูกบอลแดง ' + red + ' ลูก น้ำเงิน ' + blue + ' ลูก สุ่มหยิบ 1 ลูก จงหาความน่าจะเป็นที่จะได้สี' + pickColor + ' (ตอบทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo((total - pick) / total, 4), tag: 'Concept_Mix', feedback: 'นี่คือความน่าจะเป็นของอีกสีหนึ่ง' },
            { answer: roundTo(1 / total, 4), tag: 'Concept_Mix', feedback: 'ต้องนับจำนวนลูกบอลสีที่ต้องการทั้งหมด ไม่ใช่ 1 ลูก' }
        ];
        steps = [
            'ลูกบอลทั้งหมด = ' + red + ' + ' + blue + ' = ' + total + ' ลูก',
            'จำนวนลูกบอลสี' + pickColor + ' = ' + pick + ' ลูก',
            'P = ' + pick + '/' + total + ' = ' + correctAnswer
        ];
        branches = ['แดง(' + red + ')', 'น้ำเงิน(' + blue + ')'];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.001,
        traps: traps,
        steps: steps,
        visualType: 'tree_diagram',
        visualData: { branches: branches, title: 'ความน่าจะเป็น' }
    };
}

function generateQuestion_trig_ratios() {
    var angles = [
        { deg: 30, sin: 0.5, cos: roundTo(Math.sqrt(3) / 2, 4), tan: roundTo(1 / Math.sqrt(3), 4) },
        { deg: 45, sin: roundTo(Math.sqrt(2) / 2, 4), cos: roundTo(Math.sqrt(2) / 2, 4), tan: 1 },
        { deg: 60, sin: roundTo(Math.sqrt(3) / 2, 4), cos: 0.5, tan: roundTo(Math.sqrt(3), 4) }
    ];
    var chosen = randomChoice(angles);
    var func = randomChoice(['sin', 'cos', 'tan']);
    var correctAnswer, otherVals;

    if (func === 'sin') { correctAnswer = chosen.sin; otherVals = [chosen.cos, chosen.tan]; }
    else if (func === 'cos') { correctAnswer = chosen.cos; otherVals = [chosen.sin, chosen.tan]; }
    else { correctAnswer = chosen.tan; otherVals = [chosen.sin, chosen.cos]; }

    var questionText = 'จงหาค่าของ ' + func + ' ' + chosen.deg + '° (ตอบทศนิยม 4 ตำแหน่ง)';

    var traps = [
        { answer: otherVals[0], tag: 'Concept_Mix', feedback: 'สับสนระหว่างฟังก์ชันตรีโกณมิติ ตรวจสอบ sin=ตรงข้าม/ด้านเอียง cos=ชิด/ด้านเอียง tan=ตรงข้าม/ชิด' },
        { answer: otherVals[1], tag: 'Concept_Mix', feedback: 'สับสนฟังก์ชัน ตรวจดู: ' + func + ' ' + chosen.deg + '° = ' + correctAnswer }
    ];

    var steps = [
        'ในสามเหลี่ยมมุมฉาก:',
        'sin θ = ด้านตรงข้าม / ด้านเอียง',
        'cos θ = ด้านชิดมุม / ด้านเอียง',
        'tan θ = ด้านตรงข้าม / ด้านชิดมุม',
        func + ' ' + chosen.deg + '° = ' + correctAnswer
    ];

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [1, roundTo(Math.sqrt(3), 2), 2], labels: ['1', '√3', '2'], rightAngle: true, title: func + ' ' + chosen.deg + '°' }
    };
}

/* ========== M.4 เทอม 1 ========== */

function generateQuestion_sets() {
    var nA = randomInt(10, 25);
    var nB = randomInt(10, 25);
    var nAB = randomInt(2, Math.min(nA, nB) - 1);
    var onlyA = nA - nAB;
    var onlyB = nB - nAB;
    var types = ['union', 'only_a', 'complement'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'union') {
        correctAnswer = nA + nB - nAB;
        questionText = 'n(A) = ' + nA + ', n(B) = ' + nB + ', n(A∩B) = ' + nAB + ' จงหา n(A∪B)';
        traps = [
            { answer: nA + nB, tag: 'Forgot_Step', feedback: 'ต้องลบส่วนซ้ำ: n(A∪B) = n(A) + n(B) - n(A∩B)' },
            { answer: nAB, tag: 'Concept_Mix', feedback: 'นี่คือ n(A∩B) ไม่ใช่ n(A∪B)' }
        ];
        steps = [
            'สูตร: n(A∪B) = n(A) + n(B) - n(A∩B)',
            'n(A∪B) = ' + nA + ' + ' + nB + ' - ' + nAB,
            'n(A∪B) = ' + correctAnswer
        ];
    } else if (type === 'only_a') {
        correctAnswer = onlyA;
        questionText = 'n(A) = ' + nA + ', n(A∩B) = ' + nAB + ' จงหาจำนวนสมาชิกที่อยู่ใน A เท่านั้น (ไม่อยู่ใน B)';
        traps = [
            { answer: nA, tag: 'Forgot_Step', feedback: 'ต้องลบส่วนที่ซ้ำกับ B: n(A only) = n(A) - n(A∩B)' },
            { answer: nA + nAB, tag: 'Operation_Swap', feedback: 'ต้องลบ n(A∩B) ไม่ใช่บวก' }
        ];
        steps = [
            'สมาชิกที่อยู่ใน A เท่านั้น = n(A) - n(A∩B)',
            '= ' + nA + ' - ' + nAB,
            '= ' + correctAnswer
        ];
    } else {
        var U = nA + nB - nAB + randomInt(5, 15);
        var nAc = U - nA;
        correctAnswer = nAc;
        questionText = 'n(U) = ' + U + ', n(A) = ' + nA + ' จงหา n(A\')';
        traps = [
            { answer: nA, tag: 'Concept_Mix', feedback: 'A\' คือคอมพลีเมนต์ของ A: n(A\') = n(U) - n(A)' },
            { answer: U + nA, tag: 'Operation_Swap', feedback: 'ต้องลบ ไม่ใช่บวก: n(A\') = n(U) - n(A)' }
        ];
        steps = [
            'n(A\') = n(U) - n(A)',
            'n(A\') = ' + U + ' - ' + nA,
            'n(A\') = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'venn_diagram',
        visualData: { onlyA: onlyA, intersection: nAB, onlyB: onlyB, title: 'แผนภาพเวนน์' }
    };
}

function generateQuestion_logic() {
    var p = randomChoice([true, false]);
    var q = randomChoice([true, false]);
    var types = ['and', 'or', 'implication', 'biconditional'];
    var type = randomChoice(types);
    var pStr = p ? 'T' : 'F';
    var qStr = q ? 'T' : 'F';
    var questionText, correctAnswer, traps, steps, result;

    if (type === 'and') {
        result = p && q;
        correctAnswer = result ? 1 : 0;
        questionText = 'ถ้า p = ' + pStr + ', q = ' + qStr + ' จงหาค่าความจริงของ p ∧ q (ตอบ 1 = จริง, 0 = เท็จ)';
        traps = [{ answer: result ? 0 : 1, tag: 'Concept_Mix', feedback: 'p ∧ q เป็นจริงก็ต่อเมื่อทั้ง p และ q เป็นจริง' }];
        steps = ['p ∧ q (conjunction): จริงเมื่อทั้ง p และ q เป็นจริง', 'p = ' + pStr + ', q = ' + qStr, 'p ∧ q = ' + (result ? 'T (1)' : 'F (0)')];
    } else if (type === 'or') {
        result = p || q;
        correctAnswer = result ? 1 : 0;
        questionText = 'ถ้า p = ' + pStr + ', q = ' + qStr + ' จงหาค่าความจริงของ p ∨ q (ตอบ 1 = จริง, 0 = เท็จ)';
        traps = [{ answer: result ? 0 : 1, tag: 'Concept_Mix', feedback: 'p ∨ q เป็นเท็จก็ต่อเมื่อทั้ง p และ q เป็นเท็จ' }];
        steps = ['p ∨ q (disjunction): เท็จเมื่อทั้ง p และ q เป็นเท็จ', 'p = ' + pStr + ', q = ' + qStr, 'p ∨ q = ' + (result ? 'T (1)' : 'F (0)')];
    } else if (type === 'implication') {
        result = !p || q;
        correctAnswer = result ? 1 : 0;
        questionText = 'ถ้า p = ' + pStr + ', q = ' + qStr + ' จงหาค่าความจริงของ p → q (ตอบ 1 = จริง, 0 = เท็จ)';
        traps = [
            { answer: result ? 0 : 1, tag: 'Concept_Mix', feedback: 'p → q เป็นเท็จเมื่อ p จริงแต่ q เท็จเท่านั้น' },
            { answer: (q && !p) ? 1 : (!q && p) ? 0 : (result ? 0 : 1), tag: 'Inverse_Error', feedback: 'ระวังสับสน p→q กับ q→p' }
        ];
        steps = ['p → q (implication): เท็จเฉพาะเมื่อ p = T แต่ q = F', 'p = ' + pStr + ', q = ' + qStr, 'p → q = ' + (result ? 'T (1)' : 'F (0)')];
    } else {
        result = (p === q);
        correctAnswer = result ? 1 : 0;
        questionText = 'ถ้า p = ' + pStr + ', q = ' + qStr + ' จงหาค่าความจริงของ p ↔ q (ตอบ 1 = จริง, 0 = เท็จ)';
        traps = [{ answer: result ? 0 : 1, tag: 'Concept_Mix', feedback: 'p ↔ q จริงเมื่อ p กับ q มีค่าความจริงเหมือนกัน' }];
        steps = ['p ↔ q (biconditional): จริงเมื่อ p กับ q มีค่าเหมือนกัน', 'p = ' + pStr + ', q = ' + qStr, 'p ↔ q = ' + (result ? 'T (1)' : 'F (0)')];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'truth_table',
        visualData: {
            headers: ['p', 'q', type === 'and' ? 'p∧q' : type === 'or' ? 'p∨q' : type === 'implication' ? 'p→q' : 'p↔q'],
            rows: [['T', 'T', type === 'and' ? 'T' : 'T'], ['T', 'F', type === 'and' ? 'F' : type === 'or' ? 'T' : type === 'implication' ? 'F' : 'F'], ['F', 'T', type === 'and' ? 'F' : 'T'], ['F', 'F', type === 'and' ? 'F' : type === 'or' ? 'F' : type === 'implication' ? 'T' : 'T']]
        }
    };
}

function generateQuestion_real_numbers() {
    var types = ['abs_val', 'simplify'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'abs_val') {
        var a = randomInt(-15, -1);
        correctAnswer = Math.abs(a);
        questionText = 'จงหาค่าของ |' + a + '|';
        traps = [
            { answer: a, tag: 'Concept_Mix', feedback: 'ค่าสัมบูรณ์จะให้ผลเป็นจำนวนที่ไม่เป็นลบเสมอ |' + a + '| = ' + Math.abs(a) },
            { answer: -Math.abs(a), tag: 'Sign_Error', feedback: '|x| ≥ 0 เสมอ' }
        ];
        steps = [
            'ค่าสัมบูรณ์ |x| = ระยะห่างของ x จาก 0',
            '|' + a + '| = ' + Math.abs(a) + ' (ระยะห่างจาก 0 คือ ' + Math.abs(a) + ')',
            'คำตอบ = ' + correctAnswer
        ];
    } else {
        var a2 = randomInt(-8, 8);
        var b = randomInt(-8, 8);
        while (a2 === 0 || b === 0) { a2 = randomInt(-8, 8); b = randomInt(-8, 8); }
        correctAnswer = Math.abs(a2) + Math.abs(b);
        questionText = 'จงหาค่าของ |' + a2 + '| + |' + b + '|';
        traps = [
            { answer: Math.abs(a2 + b), tag: 'Formula_Confusion', feedback: '|a| + |b| ≠ |a + b| เสมอไป ต้องหาค่าสัมบูรณ์แยกแล้วค่อยบวก' },
            { answer: a2 + b, tag: 'Forgot_Step', feedback: 'ต้องหาค่าสัมบูรณ์ก่อนบวก' }
        ];
        steps = [
            '|' + a2 + '| + |' + b + '|',
            '= ' + Math.abs(a2) + ' + ' + Math.abs(b),
            '= ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { points: [type === 'abs_val' ? -correctAnswer : 0, correctAnswer], labels: ['', '|x| = ' + correctAnswer], title: 'ค่าสัมบูรณ์' }
    };
}

/* ========== M.4 เทอม 2 ========== */

function generateQuestion_relations_functions() {
    var types = ['evaluate', 'compose'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'evaluate') {
        var a = randomInt(1, 5);
        var b = randomInt(-5, 5);
        var x = randomInt(-4, 4);
        correctAnswer = a * x + b;
        questionText = 'ถ้า f(x) = ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' จงหาค่า f(' + x + ')';
        traps = [
            { answer: a + x + b, tag: 'Operation_Swap', feedback: 'ต้องแทนค่า x คูณสัมประสิทธิ์ ไม่ใช่บวก' },
            { answer: a * x - b, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมายของค่าคงที่' }
        ];
        steps = [
            'f(x) = ' + a + 'x' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)),
            'f(' + x + ') = ' + a + '(' + x + ')' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)),
            'f(' + x + ') = ' + (a * x) + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + ' = ' + correctAnswer
        ];
    } else {
        var a1 = randomInt(1, 3);
        var b1 = randomInt(-3, 3);
        var a2 = randomInt(1, 3);
        var b2 = randomInt(-3, 3);
        var x2 = randomInt(-3, 3);
        var gx = a2 * x2 + b2;
        correctAnswer = a1 * gx + b1;
        questionText = 'ถ้า f(x) = ' + a1 + 'x' + (b1 >= 0 ? ' + ' + b1 : ' - ' + Math.abs(b1)) + ' และ g(x) = ' + a2 + 'x' + (b2 >= 0 ? ' + ' + b2 : ' - ' + Math.abs(b2)) + ' จงหาค่า f(g(' + x2 + '))';
        traps = [
            { answer: a2 * (a1 * x2 + b1) + b2, tag: 'Order_Error', feedback: 'f(g(x)) หมายถึงแทน g(x) ใน f ไม่ใช่แทน f(x) ใน g' },
            { answer: a1 * x2 + b1 + a2 * x2 + b2, tag: 'Concept_Mix', feedback: 'f(g(x)) ≠ f(x) + g(x)' }
        ];
        steps = [
            'หา g(' + x2 + ') = ' + a2 + '(' + x2 + ')' + (b2 >= 0 ? ' + ' + b2 : ' - ' + Math.abs(b2)) + ' = ' + gx,
            'แทนใน f: f(' + gx + ') = ' + a1 + '(' + gx + ')' + (b1 >= 0 ? ' + ' + b1 : ' - ' + Math.abs(b1)),
            'f(g(' + x2 + ')) = ' + (a1 * gx) + (b1 >= 0 ? ' + ' + b1 : ' - ' + Math.abs(b1)) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -15, yMax: 15, title: 'ฟังก์ชัน' }
    };
}

function generateQuestion_exp_log() {
    var types = ['log_basic', 'exp_solve', 'log_rule'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'log_basic') {
        var base = randomChoice([2, 3, 5, 10]);
        var exp = randomInt(1, 5);
        var val = Math.pow(base, exp);
        correctAnswer = exp;
        questionText = 'จงหาค่าของ log_' + base + '(' + val + ')';
        traps = [
            { answer: val / base, tag: 'Concept_Mix', feedback: 'log_' + base + '(' + val + ') คือ ยกกำลังเท่าไหร่ถึงได้ ' + val + ' ไม่ใช่ ' + val + '/' + base },
            { answer: base, tag: 'Concept_Mix', feedback: 'ค่าของ log คือเลขชี้กำลัง ไม่ใช่ฐาน' }
        ];
        steps = [
            'log_' + base + '(' + val + ') = n หมายถึง ' + base + '^n = ' + val,
            base + '^' + exp + ' = ' + val,
            'ดังนั้น log_' + base + '(' + val + ') = ' + exp
        ];
    } else if (type === 'exp_solve') {
        var base2 = randomChoice([2, 3, 5]);
        var ans = randomInt(2, 5);
        var result = Math.pow(base2, ans);
        correctAnswer = ans;
        questionText = 'จงแก้สมการ ' + base2 + '^x = ' + result + ' หาค่า x';
        traps = [
            { answer: result / base2, tag: 'Concept_Mix', feedback: 'ต้องใช้ลอการิทึม: x = log_' + base2 + '(' + result + ')' },
            { answer: roundTo(Math.log(result), 2), tag: 'Formula_Confusion', feedback: 'ต้องใช้ log ฐาน ' + base2 + ' ไม่ใช่ ln' }
        ];
        steps = [
            base2 + '^x = ' + result,
            'ใช้ log ทั้งสองข้าง: x = log_' + base2 + '(' + result + ')',
            base2 + '^' + ans + ' = ' + result + ' ดังนั้น x = ' + ans
        ];
    } else {
        var a = randomInt(2, 5);
        var b = randomInt(2, 5);
        correctAnswer = roundTo(Math.log10(a) + Math.log10(b), 4);
        var prod = a * b;
        questionText = 'จงหาค่าของ log(' + a + ') + log(' + b + ') (log ฐาน 10 ตอบทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(Math.log10(a + b), 4), tag: 'Formula_Confusion', feedback: 'log(a) + log(b) = log(a×b) ไม่ใช่ log(a+b)' },
            { answer: roundTo(Math.log10(a) * Math.log10(b), 4), tag: 'Operation_Swap', feedback: 'log(a) + log(b) = log(a×b) ใช้สมบัติผลคูณ ไม่ใช่ log(a)×log(b)' }
        ];
        steps = [
            'สมบัติ: log(a) + log(b) = log(a × b)',
            'log(' + a + ') + log(' + b + ') = log(' + a + ' × ' + b + ') = log(' + prod + ')',
            'log(' + prod + ') = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'function_curve',
        visualData: { xMin: 0.1, xMax: 10, yMin: -2, yMax: 4, title: 'ลอการิทึม' }
    };
}

function generateQuestion_analytic_geometry() {
    var types = ['distance', 'midpoint'];
    var type = randomChoice(types);
    var x1 = randomInt(-6, 6);
    var y1 = randomInt(-6, 6);
    var x2 = randomInt(-6, 6);
    var y2 = randomInt(-6, 6);
    while (x1 === x2 && y1 === y2) { x2 = randomInt(-6, 6); y2 = randomInt(-6, 6); }
    var questionText, correctAnswer, traps, steps;

    if (type === 'distance') {
        var dx = x2 - x1, dy = y2 - y1;
        correctAnswer = roundTo(Math.sqrt(dx * dx + dy * dy), 2);
        questionText = 'จงหาระยะทางระหว่างจุด (' + x1 + ', ' + y1 + ') และ (' + x2 + ', ' + y2 + ') ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: Math.abs(dx) + Math.abs(dy), tag: 'Formula_Confusion', feedback: 'ระยะทาง = √((x₂-x₁)² + (y₂-y₁)²) ไม่ใช่ |Δx| + |Δy|' },
            { answer: roundTo(Math.sqrt(Math.abs(dx) + Math.abs(dy)), 2), tag: 'Order_Error', feedback: 'ต้องยกกำลังสองก่อนบวก แล้วค่อยถอดราก' }
        ];
        steps = [
            'สูตรระยะทาง = √((x₂-x₁)² + (y₂-y₁)²)',
            'Δx = ' + x2 + ' - ' + x1 + ' = ' + dx + ', Δy = ' + y2 + ' - ' + y1 + ' = ' + dy,
            'd = √(' + dx + '² + ' + dy + '²) = √(' + (dx * dx) + ' + ' + (dy * dy) + ') = √' + (dx * dx + dy * dy),
            'd = ' + correctAnswer
        ];
    } else {
        var mx = roundTo((x1 + x2) / 2, 2);
        correctAnswer = mx;
        questionText = 'จงหาค่า x ของจุดกึ่งกลางระหว่าง (' + x1 + ', ' + y1 + ') และ (' + x2 + ', ' + y2 + ')';
        traps = [
            { answer: x1 + x2, tag: 'Forgot_Step', feedback: 'จุดกึ่งกลาง x = (x₁ + x₂) / 2 อย่าลืมหาร 2' },
            { answer: roundTo((y1 + y2) / 2, 2), tag: 'Concept_Mix', feedback: 'โจทย์ถามค่า x ไม่ใช่ค่า y' }
        ];
        steps = [
            'สูตรจุดกึ่งกลาง: M = ((x₁+x₂)/2, (y₁+y₂)/2)',
            'Mx = (' + x1 + ' + ' + x2 + ') / 2 = ' + (x1 + x2) + ' / 2 = ' + mx,
            'ค่า x ของจุดกึ่งกลาง = ' + mx
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -10, yMax: 10, points: [[x1, y1], [x2, y2]], title: type === 'distance' ? 'ระยะทาง' : 'จุดกึ่งกลาง' }
    };
}


/* ========== M.5 เทอม 1 ========== */

function generateQuestion_trig_functions() {
    var types = ['pythagorean', 'double_angle', 'basic_value'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'pythagorean') {
        var sinVal = roundTo(randomChoice([3, 4, 5]) / 13, 4);
        var cosVal = roundTo(Math.sqrt(1 - sinVal * sinVal), 4);
        correctAnswer = cosVal;
        questionText = 'ถ้า sin θ = ' + sinVal + ' (θ อยู่ใน Q1) จงหาค่า cos θ (ทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(1 - sinVal, 4), tag: 'Formula_Confusion', feedback: 'sin²θ + cos²θ = 1 ดังนั้น cos θ = √(1 - sin²θ) ไม่ใช่ 1 - sin θ' },
            { answer: sinVal, tag: 'Concept_Mix', feedback: 'sin θ ≠ cos θ (ยกเว้น θ = 45°)' }
        ];
        steps = [
            'จากเอกลักษณ์: sin²θ + cos²θ = 1',
            'cos²θ = 1 - sin²θ = 1 - ' + roundTo(sinVal * sinVal, 4),
            'cos²θ = ' + roundTo(1 - sinVal * sinVal, 4),
            'cos θ = √' + roundTo(1 - sinVal * sinVal, 4) + ' = ' + cosVal + ' (Q1 จึงเป็นบวก)'
        ];
    } else if (type === 'double_angle') {
        var angle = randomChoice([30, 45, 60]);
        var sinA = Math.sin(angle * Math.PI / 180);
        var cosA = Math.cos(angle * Math.PI / 180);
        correctAnswer = roundTo(2 * sinA * cosA, 4);
        questionText = 'จงหาค่าของ sin 2θ เมื่อ θ = ' + angle + '° (ทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(2 * sinA, 4), tag: 'Formula_Confusion', feedback: 'sin 2θ = 2·sin θ·cos θ ไม่ใช่ 2·sin θ' },
            { answer: roundTo(sinA * sinA, 4), tag: 'Concept_Mix', feedback: 'sin 2θ ≠ sin²θ' }
        ];
        steps = [
            'สูตร: sin 2θ = 2·sin θ·cos θ',
            'sin ' + angle + '° = ' + roundTo(sinA, 4) + ', cos ' + angle + '° = ' + roundTo(cosA, 4),
            'sin 2(' + angle + '°) = 2 × ' + roundTo(sinA, 4) + ' × ' + roundTo(cosA, 4),
            'sin ' + (2 * angle) + '° = ' + correctAnswer
        ];
    } else {
        var angles = [
            { deg: 30, sin: 0.5, cos: roundTo(Math.sqrt(3) / 2, 4), tan: roundTo(1 / Math.sqrt(3), 4) },
            { deg: 45, sin: roundTo(Math.sqrt(2) / 2, 4), cos: roundTo(Math.sqrt(2) / 2, 4), tan: 1 },
            { deg: 60, sin: roundTo(Math.sqrt(3) / 2, 4), cos: 0.5, tan: roundTo(Math.sqrt(3), 4) }
        ];
        var chosen = randomChoice(angles);
        var func = randomChoice(['sin', 'cos', 'tan']);
        var otherVals;
        if (func === 'sin') { correctAnswer = chosen.sin; otherVals = [chosen.cos, chosen.tan]; }
        else if (func === 'cos') { correctAnswer = chosen.cos; otherVals = [chosen.sin, chosen.tan]; }
        else { correctAnswer = chosen.tan; otherVals = [chosen.sin, chosen.cos]; }
        questionText = 'จงหาค่าของ ' + func + ' ' + chosen.deg + '° (ตอบทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: otherVals[0], tag: 'Concept_Mix', feedback: 'สับสนระหว่างฟังก์ชันตรีโกณมิติ ตรวจสอบ sin=ตรงข้าม/ด้านเอียง cos=ชิด/ด้านเอียง tan=ตรงข้าม/ชิด' },
            { answer: otherVals[1], tag: 'Concept_Mix', feedback: 'สับสนฟังก์ชัน ตรวจดู: ' + func + ' ' + chosen.deg + '° = ' + correctAnswer }
        ];
        steps = [
            'ในสามเหลี่ยมมุมฉาก:',
            'sin θ = ด้านตรงข้าม / ด้านเอียง',
            'cos θ = ด้านชิดมุม / ด้านเอียง',
            'tan θ = ด้านตรงข้าม / ด้านชิดมุม',
            func + ' ' + chosen.deg + '° = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'unit_circle',
        visualData: { title: 'ฟังก์ชันตรีโกณมิติ' }
    };
}

function generateQuestion_matrices() {
    var types = ['add', 'multiply_scalar', 'determinant'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'add') {
        var a11 = randomInt(-5, 5), a12 = randomInt(-5, 5);
        var a21 = randomInt(-5, 5), a22 = randomInt(-5, 5);
        var b11 = randomInt(-5, 5), b12 = randomInt(-5, 5);
        var b21 = randomInt(-5, 5), b22 = randomInt(-5, 5);
        var pos = randomChoice(['11', '12', '21', '22']);
        var rMap = { '11': [a11, b11], '12': [a12, b12], '21': [a21, b21], '22': [a22, b22] };
        correctAnswer = rMap[pos][0] + rMap[pos][1];
        questionText = 'A = [[' + a11 + ',' + a12 + '],[' + a21 + ',' + a22 + ']] B = [[' + b11 + ',' + b12 + '],[' + b21 + ',' + b22 + ']] จงหาสมาชิกตำแหน่ง (' + pos[0] + ',' + pos[1] + ') ของ A+B';
        traps = [
            { answer: rMap[pos][0] * rMap[pos][1], tag: 'Operation_Swap', feedback: 'การบวกเมทริกซ์ให้บวกสมาชิกตำแหน่งเดียวกัน ไม่ใช่คูณ' },
            { answer: rMap[pos][0] - rMap[pos][1], tag: 'Sign_Error', feedback: 'โจทย์ถาม A+B ไม่ใช่ A-B' }
        ];
        steps = [
            'A+B: บวกสมาชิกตำแหน่งเดียวกัน',
            'ตำแหน่ง (' + pos[0] + ',' + pos[1] + '): ' + rMap[pos][0] + ' + ' + rMap[pos][1] + ' = ' + correctAnswer
        ];
    } else if (type === 'multiply_scalar') {
        var k = randomInt(2, 5);
        var m11 = randomInt(-5, 5), m12 = randomInt(-5, 5);
        var m21 = randomInt(-5, 5), m22 = randomInt(-5, 5);
        var mpos = randomChoice(['11', '12', '21', '22']);
        var mMap = { '11': m11, '12': m12, '21': m21, '22': m22 };
        correctAnswer = k * mMap[mpos];
        questionText = 'A = [[' + m11 + ',' + m12 + '],[' + m21 + ',' + m22 + ']] จงหาสมาชิกตำแหน่ง (' + mpos[0] + ',' + mpos[1] + ') ของ ' + k + 'A';
        traps = [
            { answer: mMap[mpos], tag: 'Forgot_Step', feedback: 'ต้องคูณทุกสมาชิกด้วย ' + k },
            { answer: k + mMap[mpos], tag: 'Operation_Swap', feedback: 'การคูณเมทริกซ์ด้วยสเกลาร์ใช้การคูณ ไม่ใช่บวก' }
        ];
        steps = [
            k + 'A: คูณทุกสมาชิกด้วย ' + k,
            'ตำแหน่ง (' + mpos[0] + ',' + mpos[1] + '): ' + k + ' × ' + mMap[mpos] + ' = ' + correctAnswer
        ];
    } else {
        var d11 = randomInt(-5, 5), d12 = randomInt(-5, 5);
        var d21 = randomInt(-5, 5), d22 = randomInt(-5, 5);
        correctAnswer = d11 * d22 - d12 * d21;
        questionText = 'จงหาดีเทอร์มิแนนต์ของเมทริกซ์ [[' + d11 + ',' + d12 + '],[' + d21 + ',' + d22 + ']]';
        traps = [
            { answer: d11 * d22 + d12 * d21, tag: 'Sign_Error', feedback: 'det = ad - bc ไม่ใช่ ad + bc' },
            { answer: d12 * d21 - d11 * d22, tag: 'Sign_Error', feedback: 'det = ad - bc ระวังลำดับ: a=(' + d11 + ')d=(' + d22 + ') - b=(' + d12 + ')c=(' + d21 + ')' }
        ];
        steps = [
            'เมทริกซ์ [[' + d11 + ',' + d12 + '],[' + d21 + ',' + d22 + ']]',
            'det = ad - bc = (' + d11 + ')(' + d22 + ') - (' + d12 + ')(' + d21 + ')',
            'det = ' + (d11 * d22) + ' - ' + (d12 * d21) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'matrix',
        visualData: { title: 'เมทริกซ์' }
    };
}

function generateQuestion_vectors() {
    var types = ['magnitude', 'dot_product', 'add'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'magnitude') {
        var vx = randomInt(-6, 6);
        var vy = randomInt(-6, 6);
        while (vx === 0 && vy === 0) { vx = randomInt(-6, 6); vy = randomInt(-6, 6); }
        correctAnswer = roundTo(Math.sqrt(vx * vx + vy * vy), 2);
        questionText = 'จงหาขนาดของเวกเตอร์ (' + vx + ', ' + vy + ') ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: Math.abs(vx) + Math.abs(vy), tag: 'Formula_Confusion', feedback: '|v| = √(x²+y²) ไม่ใช่ |x|+|y|' },
            { answer: vx * vx + vy * vy, tag: 'Forgot_Step', feedback: 'อย่าลืมถอดรากที่สอง: |v| = √(' + (vx * vx + vy * vy) + ')' }
        ];
        steps = [
            '|v| = √(vx² + vy²)',
            '= √(' + vx + '² + ' + vy + '²)',
            '= √(' + (vx * vx) + ' + ' + (vy * vy) + ')',
            '= √' + (vx * vx + vy * vy) + ' = ' + correctAnswer
        ];
    } else if (type === 'dot_product') {
        var ax = randomInt(-5, 5), ay = randomInt(-5, 5);
        var bx = randomInt(-5, 5), by = randomInt(-5, 5);
        correctAnswer = ax * bx + ay * by;
        questionText = 'จงหา a·b เมื่อ a = (' + ax + ', ' + ay + ') และ b = (' + bx + ', ' + by + ')';
        traps = [
            { answer: ax * bx - ay * by, tag: 'Sign_Error', feedback: 'ดอทโพรดักต์: a·b = a₁b₁ + a₂b₂ (บวก ไม่ใช่ลบ)' },
            { answer: ax * by + ay * bx, tag: 'Order_Error', feedback: 'ดอทโพรดักต์: a·b = a₁b₁ + a₂b₂ (คูณ component เดียวกัน)' }
        ];
        steps = [
            'a·b = a₁b₁ + a₂b₂',
            '= (' + ax + ')(' + bx + ') + (' + ay + ')(' + by + ')',
            '= ' + (ax * bx) + ' + ' + (ay * by),
            '= ' + correctAnswer
        ];
    } else {
        var ux = randomInt(-5, 5), uy = randomInt(-5, 5);
        var wx = randomInt(-5, 5), wy = randomInt(-5, 5);
        var ask = randomChoice(['x', 'y']);
        correctAnswer = ask === 'x' ? ux + wx : uy + wy;
        questionText = 'จงหาค่า ' + ask + ' ของ u + w เมื่อ u = (' + ux + ', ' + uy + ') และ w = (' + wx + ', ' + wy + ')';
        traps = [
            { answer: ask === 'x' ? ux - wx : uy - wy, tag: 'Sign_Error', feedback: 'การบวกเวกเตอร์ให้บวก component เดียวกัน' },
            { answer: ask === 'x' ? uy + wy : ux + wx, tag: 'Concept_Mix', feedback: 'โจทย์ถามค่า ' + ask + ' ไม่ใช่ ' + (ask === 'x' ? 'y' : 'x') }
        ];
        steps = [
            'u + w = (' + ux + (wx >= 0 ? '+' : '') + wx + ', ' + uy + (wy >= 0 ? '+' : '') + wy + ')',
            '= (' + (ux + wx) + ', ' + (uy + wy) + ')',
            'ค่า ' + ask + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -10, xMax: 10, yMin: -10, yMax: 10, title: 'เวกเตอร์' }
    };
}

/* ========== M.5 เทอม 2 ========== */

function generateQuestion_complex_numbers() {
    var types = ['add', 'multiply', 'modulus'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'add') {
        var a1 = randomInt(-5, 5), b1 = randomInt(-5, 5);
        var a2 = randomInt(-5, 5), b2 = randomInt(-5, 5);
        var ask = randomChoice(['real', 'imaginary']);
        correctAnswer = ask === 'real' ? a1 + a2 : b1 + b2;
        var z1 = a1 + (b1 >= 0 ? ' + ' + b1 : ' - ' + Math.abs(b1)) + 'i';
        var z2 = a2 + (b2 >= 0 ? ' + ' + b2 : ' - ' + Math.abs(b2)) + 'i';
        questionText = 'z₁ = ' + z1 + ', z₂ = ' + z2 + ' จงหาส่วน' + (ask === 'real' ? 'จริง' : 'จินตภาพ') + 'ของ z₁ + z₂';
        traps = [
            { answer: ask === 'real' ? b1 + b2 : a1 + a2, tag: 'Concept_Mix', feedback: 'ตรวจสอบว่าตอบส่วนที่ถูกต้อง (จริง vs จินตภาพ)' },
            { answer: ask === 'real' ? a1 - a2 : b1 - b2, tag: 'Sign_Error', feedback: 'โจทย์ถาม z₁ + z₂ ไม่ใช่ z₁ - z₂' }
        ];
        steps = [
            'z₁ + z₂ = (' + a1 + (a2 >= 0 ? '+' : '') + a2 + ') + (' + b1 + (b2 >= 0 ? '+' : '') + b2 + ')i',
            '= ' + (a1 + a2) + ' + ' + (b1 + b2) + 'i',
            'ส่วน' + (ask === 'real' ? 'จริง' : 'จินตภาพ') + ' = ' + correctAnswer
        ];
    } else if (type === 'multiply') {
        var ca = randomInt(-3, 3), cb = randomInt(-3, 3);
        var da = randomInt(-3, 3), db = randomInt(-3, 3);
        while (ca === 0 && cb === 0) { ca = randomInt(-3, 3); cb = randomInt(-3, 3); }
        while (da === 0 && db === 0) { da = randomInt(-3, 3); db = randomInt(-3, 3); }
        var realPart = ca * da - cb * db;
        var imagPart = ca * db + cb * da;
        var askPart = randomChoice(['real', 'imaginary']);
        correctAnswer = askPart === 'real' ? realPart : imagPart;
        questionText = 'z₁ = ' + ca + (cb >= 0 ? '+' : '') + cb + 'i, z₂ = ' + da + (db >= 0 ? '+' : '') + db + 'i จงหาส่วน' + (askPart === 'real' ? 'จริง' : 'จินตภาพ') + 'ของ z₁·z₂';
        traps = [
            { answer: ca * da + cb * db, tag: 'Sign_Error', feedback: 'เมื่อคูณจำนวนเชิงซ้อน: i² = -1 ดังนั้นส่วนจริง = ac - bd' },
            { answer: askPart === 'real' ? imagPart : realPart, tag: 'Concept_Mix', feedback: 'ตรวจว่าตอบส่วนที่ถูกต้อง' }
        ];
        steps = [
            'z₁·z₂ = (' + ca + (cb >= 0 ? '+' : '') + cb + 'i)(' + da + (db >= 0 ? '+' : '') + db + 'i)',
            'ส่วนจริง = (' + ca + ')(' + da + ') - (' + cb + ')(' + db + ') = ' + (ca * da) + ' - ' + (cb * db) + ' = ' + realPart,
            'ส่วนจินตภาพ = (' + ca + ')(' + db + ') + (' + cb + ')(' + da + ') = ' + (ca * db) + ' + ' + (cb * da) + ' = ' + imagPart,
            'ส่วน' + (askPart === 'real' ? 'จริง' : 'จินตภาพ') + ' = ' + correctAnswer
        ];
    } else {
        var za = randomInt(-5, 5), zb = randomInt(-5, 5);
        while (za === 0 && zb === 0) { za = randomInt(-5, 5); zb = randomInt(-5, 5); }
        correctAnswer = roundTo(Math.sqrt(za * za + zb * zb), 2);
        questionText = 'จงหาค่าสัมบูรณ์ (modulus) ของ z = ' + za + (zb >= 0 ? ' + ' : ' - ') + Math.abs(zb) + 'i ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: Math.abs(za) + Math.abs(zb), tag: 'Formula_Confusion', feedback: '|z| = √(a² + b²) ไม่ใช่ |a| + |b|' },
            { answer: za * za + zb * zb, tag: 'Forgot_Step', feedback: 'อย่าลืมถอดราก: |z| = √(' + (za * za + zb * zb) + ')' }
        ];
        steps = [
            '|z| = √(a² + b²)',
            '= √(' + za + '² + ' + zb + '²)',
            '= √(' + (za * za) + ' + ' + (zb * zb) + ')',
            '= √' + (za * za + zb * zb) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'coordinate_plane',
        visualData: { xMin: -8, xMax: 8, yMin: -8, yMax: 8, title: 'จำนวนเชิงซ้อน' }
    };
}

function generateQuestion_counting_principles() {
    var types = ['factorial', 'permutation', 'combination'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    function factorial(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }

    if (type === 'factorial') {
        var n = randomInt(4, 8);
        correctAnswer = factorial(n);
        questionText = 'จงหาค่าของ ' + n + '!';
        traps = [
            { answer: n * (n - 1), tag: 'Forgot_Step', feedback: n + '! = ' + n + '×' + (n - 1) + '×...×1 ต้องคูณลงไปจนถึง 1' },
            { answer: Math.pow(n, 2), tag: 'Formula_Confusion', feedback: n + '! ≠ n² แฟกทอเรียลคือผลคูณต่อเนื่อง' }
        ];
        steps = [n + '! = '];
        var expr = '';
        for (var i = n; i >= 1; i--) { expr += i + (i > 1 ? ' × ' : ''); }
        steps[0] += expr;
        steps.push('= ' + correctAnswer);
    } else if (type === 'permutation') {
        var np = randomInt(5, 8);
        var rp = randomInt(2, Math.min(4, np));
        correctAnswer = factorial(np) / factorial(np - rp);
        questionText = 'จงหาค่า P(' + np + ',' + rp + ')';
        traps = [
            { answer: factorial(np) / (factorial(rp) * factorial(np - rp)), tag: 'Concept_Mix', feedback: 'นี่คือ C(' + np + ',' + rp + ') (combination) ไม่ใช่ P(' + np + ',' + rp + ') (permutation)' },
            { answer: np * rp, tag: 'Formula_Confusion', feedback: 'P(n,r) = n!/(n-r)! ไม่ใช่ n×r' }
        ];
        steps = [
            'P(n,r) = n! / (n-r)!',
            'P(' + np + ',' + rp + ') = ' + np + '! / ' + (np - rp) + '!',
            '= ' + factorial(np) + ' / ' + factorial(np - rp),
            '= ' + correctAnswer
        ];
    } else {
        var nc = randomInt(5, 10);
        var rc = randomInt(2, Math.min(4, nc));
        correctAnswer = factorial(nc) / (factorial(rc) * factorial(nc - rc));
        questionText = 'จงหาค่า C(' + nc + ',' + rc + ')';
        traps = [
            { answer: factorial(nc) / factorial(nc - rc), tag: 'Forgot_Step', feedback: 'C(n,r) = n! / (r!(n-r)!) ต้องหารด้วย r! ด้วย' },
            { answer: nc * rc, tag: 'Formula_Confusion', feedback: 'C(n,r) = n! / (r!(n-r)!) ไม่ใช่ n×r' }
        ];
        steps = [
            'C(n,r) = n! / (r!(n-r)!)',
            'C(' + nc + ',' + rc + ') = ' + nc + '! / (' + rc + '! × ' + (nc - rc) + '!)',
            '= ' + factorial(nc) + ' / (' + factorial(rc) + ' × ' + factorial(nc - rc) + ')',
            '= ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'tree_diagram',
        visualData: { title: 'การนับ / จัดเรียง' }
    };
}

function generateQuestion_probability_2() {
    var types = ['independent', 'conditional', 'complement'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'independent') {
        var pA = roundTo(randomInt(1, 9) / 10, 2);
        var pB = roundTo(randomInt(1, 9) / 10, 2);
        correctAnswer = roundTo(pA * pB, 4);
        questionText = 'เหตุการณ์ A และ B เป็นอิสระกัน P(A) = ' + pA + ', P(B) = ' + pB + ' จงหา P(A∩B)';
        traps = [
            { answer: roundTo(pA + pB, 4), tag: 'Formula_Confusion', feedback: 'เหตุการณ์อิสระ: P(A∩B) = P(A)×P(B) ใช้คูณ ไม่ใช่บวก' },
            { answer: roundTo(pA + pB - pA * pB, 4), tag: 'Concept_Mix', feedback: 'นี่คือ P(A∪B) ไม่ใช่ P(A∩B)' }
        ];
        steps = [
            'เหตุการณ์อิสระ: P(A∩B) = P(A) × P(B)',
            'P(A∩B) = ' + pA + ' × ' + pB,
            'P(A∩B) = ' + correctAnswer
        ];
    } else if (type === 'conditional') {
        var pAB = roundTo(randomInt(1, 5) / 20, 4);
        var pBc = roundTo(randomInt(2, 8) / 10, 2);
        correctAnswer = roundTo(pAB / pBc, 4);
        questionText = 'P(A∩B) = ' + pAB + ', P(B) = ' + pBc + ' จงหา P(A|B) (ทศนิยม 4 ตำแหน่ง)';
        traps = [
            { answer: roundTo(pBc / pAB, 4), tag: 'Inverse_Error', feedback: 'P(A|B) = P(A∩B)/P(B) ไม่ใช่ P(B)/P(A∩B)' },
            { answer: pAB, tag: 'Forgot_Step', feedback: 'P(A|B) = P(A∩B)/P(B) ต้องหารด้วย P(B)' }
        ];
        steps = [
            'สูตร: P(A|B) = P(A∩B) / P(B)',
            'P(A|B) = ' + pAB + ' / ' + pBc,
            'P(A|B) = ' + correctAnswer
        ];
    } else {
        var pEvent = roundTo(randomInt(1, 9) / 10, 2);
        correctAnswer = roundTo(1 - pEvent, 2);
        questionText = 'P(A) = ' + pEvent + ' จงหา P(A\')';
        traps = [
            { answer: pEvent, tag: 'Concept_Mix', feedback: 'P(A\') = 1 - P(A) ค่าคอมพลีเมนต์ ≠ ค่าเดิม' },
            { answer: roundTo(1 / pEvent, 4), tag: 'Formula_Confusion', feedback: 'P(A\') = 1 - P(A) ไม่ใช่ 1/P(A)' }
        ];
        steps = [
            'สูตรคอมพลีเมนต์: P(A\') = 1 - P(A)',
            'P(A\') = 1 - ' + pEvent,
            'P(A\') = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'venn_diagram',
        visualData: { title: 'ความน่าจะเป็น' }
    };
}

/* ========== M.6 เทอม 1 ========== */

function generateQuestion_sequences_series() {
    var types = ['arithmetic_nth', 'arithmetic_sum', 'geometric_nth'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'arithmetic_nth') {
        var a1 = randomInt(1, 10);
        var d = randomInt(1, 6);
        var n = randomInt(8, 20);
        correctAnswer = a1 + (n - 1) * d;
        questionText = 'ลำดับเลขคณิต a₁ = ' + a1 + ', d = ' + d + ' จงหาพจน์ที่ ' + n;
        traps = [
            { answer: a1 + n * d, tag: 'Boundary_Error', feedback: 'สูตร aₙ = a₁ + (n-1)d ใช้ (n-1) ไม่ใช่ n' },
            { answer: a1 * d * n, tag: 'Formula_Confusion', feedback: 'ลำดับเลขคณิตใช้การบวก ไม่ใช่คูณ: aₙ = a₁ + (n-1)d' }
        ];
        steps = [
            'สูตรลำดับเลขคณิต: aₙ = a₁ + (n-1)d',
            'a₁ = ' + a1 + ', d = ' + d + ', n = ' + n,
            'a' + n + ' = ' + a1 + ' + (' + n + '-1)×' + d + ' = ' + a1 + ' + ' + ((n - 1) * d),
            'a' + n + ' = ' + correctAnswer
        ];
    } else if (type === 'arithmetic_sum') {
        var a1s = randomInt(1, 8);
        var ds = randomInt(1, 5);
        var ns = randomInt(5, 15);
        var last = a1s + (ns - 1) * ds;
        correctAnswer = ns * (a1s + last) / 2;
        questionText = 'ลำดับเลขคณิต a₁ = ' + a1s + ', d = ' + ds + ' จงหาผลรวม ' + ns + ' พจน์แรก';
        traps = [
            { answer: a1s * ns + ds, tag: 'Formula_Confusion', feedback: 'สูตร Sₙ = n(a₁ + aₙ)/2' },
            { answer: ns * (a1s + last), tag: 'Forgot_Step', feedback: 'อย่าลืมหาร 2: Sₙ = n(a₁ + aₙ)/2' }
        ];
        steps = [
            'aₙ = a₁ + (n-1)d = ' + a1s + ' + ' + (ns - 1) + '×' + ds + ' = ' + last,
            'Sₙ = n(a₁ + aₙ)/2',
            'S' + ns + ' = ' + ns + '(' + a1s + ' + ' + last + ')/2 = ' + ns + '×' + (a1s + last) + '/2',
            'S' + ns + ' = ' + correctAnswer
        ];
    } else {
        var a1g = randomInt(1, 5);
        var r = randomChoice([2, 3]);
        var ng = randomInt(3, 6);
        correctAnswer = a1g * Math.pow(r, ng - 1);
        questionText = 'ลำดับเรขาคณิต a₁ = ' + a1g + ', r = ' + r + ' จงหาพจน์ที่ ' + ng;
        traps = [
            { answer: a1g * Math.pow(r, ng), tag: 'Boundary_Error', feedback: 'สูตร aₙ = a₁·r^(n-1) ใช้ (n-1) ไม่ใช่ n' },
            { answer: a1g + (ng - 1) * r, tag: 'Formula_Confusion', feedback: 'ลำดับเรขาคณิตใช้การคูณ ไม่ใช่บวก: aₙ = a₁·r^(n-1)' }
        ];
        steps = [
            'สูตรลำดับเรขาคณิต: aₙ = a₁·r^(n-1)',
            'a₁ = ' + a1g + ', r = ' + r + ', n = ' + ng,
            'a' + ng + ' = ' + a1g + '×' + r + '^' + (ng - 1) + ' = ' + a1g + '×' + Math.pow(r, ng - 1),
            'a' + ng + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: {
            labels: ['1', '2', '3', '4', '5'],
            values: (function() {
                var arr = [];
                for (var i = 0; i < 5; i++) {
                    if (type === 'geometric_nth') arr.push(a1g * Math.pow(r, i));
                    else if (type === 'arithmetic_nth') arr.push(a1 + i * d);
                    else arr.push(a1s + i * ds);
                }
                return arr;
            })(),
            title: 'ลำดับ'
        }
    };
}

function generateQuestion_calculus_intro() {
    var types = ['derivative_power', 'derivative_evaluate', 'integral_power'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'derivative_power') {
        var a = randomInt(1, 6);
        var n = randomInt(2, 5);
        var newCoeff = a * n;
        var newPow = n - 1;
        correctAnswer = newCoeff;
        questionText = 'จงหาสัมประสิทธิ์ของอนุพันธ์ d/dx [' + a + 'x^' + n + ']';
        traps = [
            { answer: a, tag: 'Forgot_Step', feedback: 'สูตร d/dx [axⁿ] = a·n·x^(n-1) ต้องคูณเลขชี้กำลังด้วย' },
            { answer: a * (n + 1), tag: 'Concept_Mix', feedback: 'อนุพันธ์ลดกำลังลง 1 และคูณด้วยกำลังเดิม: สัมประสิทธิ์ = ' + a + '×' + n + ' = ' + newCoeff }
        ];
        steps = [
            'สูตรอนุพันธ์: d/dx [axⁿ] = a·n·x^(n-1)',
            'd/dx [' + a + 'x^' + n + '] = ' + a + '·' + n + '·x^' + newPow,
            '= ' + newCoeff + 'x^' + newPow,
            'สัมประสิทธิ์ = ' + newCoeff
        ];
    } else if (type === 'derivative_evaluate') {
        var a2 = randomInt(1, 4);
        var n2 = randomInt(2, 4);
        var x = randomInt(1, 3);
        correctAnswer = a2 * n2 * Math.pow(x, n2 - 1);
        questionText = 'ถ้า f(x) = ' + a2 + 'x^' + n2 + ' จงหาค่า f\'(' + x + ')';
        traps = [
            { answer: a2 * Math.pow(x, n2), tag: 'Forgot_Step', feedback: 'ต้องหาอนุพันธ์ก่อนแทนค่า f\'(x) = ' + (a2 * n2) + 'x^' + (n2 - 1) },
            { answer: a2 * n2 * Math.pow(x, n2), tag: 'Boundary_Error', feedback: 'เลขชี้กำลังลดลง 1: x^' + (n2 - 1) + ' ไม่ใช่ x^' + n2 }
        ];
        steps = [
            'f(x) = ' + a2 + 'x^' + n2,
            'f\'(x) = ' + a2 + '·' + n2 + '·x^' + (n2 - 1) + ' = ' + (a2 * n2) + 'x^' + (n2 - 1),
            'f\'(' + x + ') = ' + (a2 * n2) + '·' + x + '^' + (n2 - 1) + ' = ' + (a2 * n2) + '·' + Math.pow(x, n2 - 1),
            'f\'(' + x + ') = ' + correctAnswer
        ];
    } else {
        var a3 = randomInt(1, 5);
        var n3 = randomInt(1, 4);
        var newCoeff3 = roundTo(a3 / (n3 + 1), 4);
        correctAnswer = roundTo(newCoeff3, 4);
        questionText = 'จงหาสัมประสิทธิ์ใน ∫ ' + a3 + 'x^' + n3 + ' dx (ไม่รวม C) ตอบทศนิยม 4 ตำแหน่ง';
        traps = [
            { answer: a3, tag: 'Forgot_Step', feedback: '∫axⁿ dx = a/(n+1) · x^(n+1) + C ต้องหารด้วย n+1' },
            { answer: roundTo(a3 / n3, 4), tag: 'Boundary_Error', feedback: 'ต้องหารด้วย n+1 ไม่ใช่ n: ' + a3 + '/' + (n3 + 1) }
        ];
        steps = [
            'สูตรอินทิกรัล: ∫axⁿ dx = a/(n+1) · x^(n+1) + C',
            '∫' + a3 + 'x^' + n3 + ' dx = ' + a3 + '/' + (n3 + 1) + ' · x^' + (n3 + 1) + ' + C',
            'สัมประสิทธิ์ = ' + a3 + '/' + (n3 + 1) + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'function_curve',
        visualData: { xMin: -5, xMax: 5, yMin: -10, yMax: 30, title: 'แคลคูลัส' }
    };
}

/* ========== M.6 เทอม 2 ========== */

function generateQuestion_statistics_meaning() {
    var types = ['population_sample', 'data_type', 'collection_method'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'population_sample') {
        var pop = randomInt(1000, 5000);
        var samplePercent = randomChoice([5, 10, 15, 20]);
        correctAnswer = Math.round(pop * samplePercent / 100);
        questionText = 'ประชากร ' + pop + ' คน ต้องการเก็บตัวอย่าง ' + samplePercent + '% จงหาจำนวนตัวอย่าง';
        traps = [
            { answer: pop, tag: 'Concept_Mix', feedback: 'โจทย์ถามจำนวนตัวอย่าง (' + samplePercent + '% ของประชากร) ไม่ใช่ประชากรทั้งหมด' },
            { answer: samplePercent, tag: 'Forgot_Step', feedback: 'ต้องคำนวณ ' + samplePercent + '% ของ ' + pop + ' = ' + correctAnswer }
        ];
        steps = [
            'ประชากร = ' + pop + ' คน',
            'ตัวอย่าง = ' + samplePercent + '% ของ ' + pop,
            '= ' + pop + ' × ' + samplePercent + '/100',
            '= ' + correctAnswer + ' คน'
        ];
    } else if (type === 'data_type') {
        var scenarios = [
            { desc: 'ส่วนสูงของนักเรียน (ซม.)', answer: 1, explain: 'ข้อมูลเชิงปริมาณ - วัดเป็นตัวเลขที่มีความหมายทางคณิตศาสตร์' },
            { desc: 'เกรดเฉลี่ย GPA', answer: 1, explain: 'ข้อมูลเชิงปริมาณ - เป็นตัวเลขที่มีความหมายทางคณิตศาสตร์' },
            { desc: 'สีเสื้อที่ชอบ', answer: 0, explain: 'ข้อมูลเชิงคุณภาพ - จัดเป็นหมวดหมู่ ไม่ใช่ตัวเลข' },
            { desc: 'เพศ', answer: 0, explain: 'ข้อมูลเชิงคุณภาพ - จัดเป็นหมวดหมู่' }
        ];
        var chosen = randomChoice(scenarios);
        correctAnswer = chosen.answer;
        questionText = '"' + chosen.desc + '" เป็นข้อมูลเชิงปริมาณหรือเชิงคุณภาพ? (1 = ปริมาณ, 0 = คุณภาพ)';
        traps = [
            { answer: 1 - chosen.answer, tag: 'Concept_Mix', feedback: chosen.explain }
        ];
        steps = [
            'ข้อมูล: "' + chosen.desc + '"',
            chosen.explain,
            'คำตอบ = ' + (chosen.answer === 1 ? '1 (เชิงปริมาณ)' : '0 (เชิงคุณภาพ)')
        ];
    } else {
        var methods = [
            { name: 'สุ่มอย่างง่าย', pop: 200, sample: 20 },
            { name: 'สุ่มแบบเป็นระบบ', pop: 300, sample: 30 }
        ];
        var m = randomChoice(methods);
        if (m.name === 'สุ่มแบบเป็นระบบ') {
            correctAnswer = Math.floor(m.pop / m.sample);
            questionText = 'ประชากร ' + m.pop + ' คน สุ่มแบบเป็นระบบ ' + m.sample + ' คน จงหาช่วงการสุ่ม (k)';
            traps = [
                { answer: m.sample, tag: 'Concept_Mix', feedback: 'k = N/n = ' + m.pop + '/' + m.sample + ' ไม่ใช่ n' },
                { answer: m.pop, tag: 'Concept_Mix', feedback: 'k = N/n = ' + m.pop + '/' + m.sample }
            ];
            steps = [
                'สุ่มแบบเป็นระบบ: k = N/n',
                'k = ' + m.pop + '/' + m.sample + ' = ' + correctAnswer,
                'สุ่มทุกๆ ' + correctAnswer + ' คน'
            ];
        } else {
            correctAnswer = m.sample;
            questionText = 'ประชากร ' + m.pop + ' คน ใช้วิธี' + m.name + ' เก็บตัวอย่าง 10% จงหาจำนวนตัวอย่าง';
            traps = [
                { answer: m.pop, tag: 'Concept_Mix', feedback: 'จำนวนตัวอย่าง = 10% ของ ' + m.pop + ' = ' + m.sample },
                { answer: m.pop - m.sample, tag: 'Operation_Swap', feedback: 'ต้องหา 10% ของประชากร ไม่ใช่ลบ' }
            ];
            steps = [
                'ประชากร = ' + m.pop,
                'จำนวนตัวอย่าง = 10% × ' + m.pop + ' = ' + m.sample
            ];
        }
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: ['ประชากร', 'ตัวอย่าง'], values: [type === 'population_sample' ? pop : 100, correctAnswer], title: 'สถิติเบื้องต้น' }
    };
}

function generateQuestion_qualitative_analysis() {
    var categories = [];
    var nCat = randomInt(3, 5);
    var total = 0;
    for (var i = 0; i < nCat; i++) {
        var val = randomInt(10, 50);
        categories.push({ name: 'กลุ่ม ' + String.fromCharCode(65 + i), count: val });
        total += val;
    }

    var types = ['percentage', 'mode_category', 'sector_angle'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;
    var dataStr = categories.map(function(c) { return c.name + ': ' + c.count; }).join(', ');

    if (type === 'percentage') {
        var idx = randomInt(0, nCat - 1);
        correctAnswer = roundTo((categories[idx].count / total) * 100, 2);
        questionText = 'ข้อมูลเชิงคุณภาพ: ' + dataStr + ' (รวม ' + total + ') จงหาร้อยละของ' + categories[idx].name + ' (ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: categories[idx].count, tag: 'Forgot_Step', feedback: 'ร้อยละ = (จำนวน/รวม)×100 ต้องคำนวณเป็นเปอร์เซ็นต์' },
            { answer: roundTo(categories[idx].count / total, 4), tag: 'Forgot_Step', feedback: 'ต้องคูณ 100 เพื่อแปลงเป็นร้อยละ' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr,
            'รวม = ' + total,
            'ร้อยละ ' + categories[idx].name + ' = (' + categories[idx].count + '/' + total + ') × 100',
            '= ' + correctAnswer + '%'
        ];
    } else if (type === 'mode_category') {
        var maxVal = 0;
        var maxIdx = 0;
        for (var j = 0; j < nCat; j++) {
            if (categories[j].count > maxVal) { maxVal = categories[j].count; maxIdx = j; }
        }
        correctAnswer = maxVal;
        questionText = 'ข้อมูลเชิงคุณภาพ: ' + dataStr + ' จงหาความถี่สูงสุด (ฐานนิยม)';
        traps = [
            { answer: total, tag: 'Concept_Mix', feedback: 'โจทย์ถามความถี่สูงสุด ไม่ใช่ผลรวม' },
            { answer: roundTo(total / nCat, 2), tag: 'Concept_Mix', feedback: 'โจทย์ถามความถี่สูงสุด ไม่ใช่ค่าเฉลี่ย' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr,
            'เปรียบเทียบความถี่: ' + categories.map(function(c) { return c.name + '=' + c.count; }).join(', '),
            'ความถี่สูงสุด = ' + categories[maxIdx].name + ' = ' + maxVal
        ];
    } else {
        var sIdx = randomInt(0, nCat - 1);
        correctAnswer = roundTo((categories[sIdx].count / total) * 360, 2);
        questionText = 'ข้อมูลเชิงคุณภาพ: ' + dataStr + ' (รวม ' + total + ') จงหามุมในแผนภูมิวงกลมของ' + categories[sIdx].name + ' (องศา ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo((categories[sIdx].count / total) * 100, 2), tag: 'Formula_Confusion', feedback: 'มุมในแผนภูมิวงกลม = (สัดส่วน) × 360° ไม่ใช่ × 100' },
            { answer: roundTo(360 / nCat, 2), tag: 'Concept_Mix', feedback: 'ต้องคำนวณตามสัดส่วนจริง ไม่ใช่แบ่งเท่าๆ กัน' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr + ' รวม = ' + total,
            'มุม = (จำนวน/รวม) × 360°',
            'มุม ' + categories[sIdx].name + ' = (' + categories[sIdx].count + '/' + total + ') × 360°',
            '= ' + correctAnswer + '°'
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.1,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: {
            labels: categories.map(function(c) { return c.name; }),
            values: categories.map(function(c) { return c.count; }),
            title: 'ข้อมูลเชิงคุณภาพ'
        }
    };
}

function generateQuestion_quantitative_analysis() {
    var n = randomInt(5, 8);
    var data = [];
    for (var i = 0; i < n; i++) data.push(randomInt(10, 50));
    data.sort(function(a, b) { return a - b; });

    var types = ['mean', 'median', 'variance', 'sd', 'range'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;
    var dataStr = data.join(', ');
    var sum = 0;
    for (var j = 0; j < n; j++) sum += data[j];
    var mean = sum / n;

    if (type === 'mean') {
        correctAnswer = roundTo(mean, 2);
        questionText = 'จงหาค่าเฉลี่ยของข้อมูล: ' + dataStr + ' (ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: sum, tag: 'Forgot_Step', feedback: 'ค่าเฉลี่ย = ผลรวม/จำนวน = ' + sum + '/' + n + ' ต้องหารด้วย n' },
            { answer: data[Math.floor(n / 2)], tag: 'Concept_Mix', feedback: 'นี่คือมัธยฐาน ไม่ใช่ค่าเฉลี่ย' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr,
            'ผลรวม = ' + sum,
            'จำนวนข้อมูล n = ' + n,
            'ค่าเฉลี่ย = ' + sum + '/' + n + ' = ' + correctAnswer
        ];
    } else if (type === 'median') {
        if (n % 2 === 1) {
            correctAnswer = data[Math.floor(n / 2)];
        } else {
            correctAnswer = roundTo((data[n / 2 - 1] + data[n / 2]) / 2, 2);
        }
        questionText = 'จงหามัธยฐาน (median) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: roundTo(mean, 2), tag: 'Concept_Mix', feedback: 'โจทย์ถามมัธยฐาน ไม่ใช่ค่าเฉลี่ย' },
            { answer: data[0], tag: 'Concept_Mix', feedback: 'มัธยฐานคือค่ากลาง ไม่ใช่ค่าแรก' }
        ];
        steps = [
            'เรียงข้อมูล: ' + dataStr,
            'n = ' + n,
            n % 2 === 1 ? 'ตัวที่ ' + (Math.floor(n / 2) + 1) + ' = ' + data[Math.floor(n / 2)] : 'เฉลี่ยตัวที่ ' + (n / 2) + ' กับ ' + (n / 2 + 1),
            'มัธยฐาน = ' + correctAnswer
        ];
    } else if (type === 'variance') {
        var sumSqDiff = 0;
        for (var k = 0; k < n; k++) sumSqDiff += (data[k] - mean) * (data[k] - mean);
        var variance = sumSqDiff / n;
        correctAnswer = roundTo(variance, 2);
        questionText = 'จงหาความแปรปรวน (variance) ของข้อมูล: ' + dataStr + ' (ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo(Math.sqrt(variance), 2), tag: 'Concept_Mix', feedback: 'นี่คือ SD ไม่ใช่ความแปรปรวน ความแปรปรวน = SD²' },
            { answer: roundTo(sumSqDiff / (n - 1), 2), tag: 'Boundary_Error', feedback: 'ใช้ n ในความแปรปรวนประชากร' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr + ', ค่าเฉลี่ย = ' + roundTo(mean, 2),
            'Σ(xᵢ - x̄)² = ' + roundTo(sumSqDiff, 2),
            'ความแปรปรวน = ' + roundTo(sumSqDiff, 2) + '/' + n + ' = ' + correctAnswer
        ];
    } else if (type === 'sd') {
        var sumSqDiff2 = 0;
        for (var k2 = 0; k2 < n; k2++) sumSqDiff2 += (data[k2] - mean) * (data[k2] - mean);
        var variance2 = sumSqDiff2 / n;
        correctAnswer = roundTo(Math.sqrt(variance2), 2);
        questionText = 'จงหาส่วนเบี่ยงเบนมาตรฐาน (SD) ของข้อมูล: ' + dataStr + ' (ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo(variance2, 2), tag: 'Forgot_Step', feedback: 'SD = √(ความแปรปรวน) ต้องถอดรากที่สอง' },
            { answer: roundTo(mean, 2), tag: 'Concept_Mix', feedback: 'นี่คือค่าเฉลี่ย ไม่ใช่ SD' }
        ];
        steps = [
            'ข้อมูล: ' + dataStr + ', ค่าเฉลี่ย = ' + roundTo(mean, 2),
            'ความแปรปรวน = ' + roundTo(variance2, 2),
            'SD = √' + roundTo(variance2, 2) + ' = ' + correctAnswer
        ];
    } else {
        correctAnswer = data[n - 1] - data[0];
        questionText = 'จงหาพิสัย (range) ของข้อมูล: ' + dataStr;
        traps = [
            { answer: data[n - 1], tag: 'Forgot_Step', feedback: 'พิสัย = ค่าสูงสุด - ค่าต่ำสุด' },
            { answer: data[0], tag: 'Concept_Mix', feedback: 'นี่คือค่าต่ำสุด ไม่ใช่พิสัย' }
        ];
        steps = [
            'เรียงข้อมูล: ' + dataStr,
            'ค่าสูงสุด = ' + data[n - 1] + ', ค่าต่ำสุด = ' + data[0],
            'พิสัย = ' + data[n - 1] + ' - ' + data[0] + ' = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.1,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: data.map(function(v, i) { return '' + (i + 1); }), values: data, title: 'ข้อมูลเชิงปริมาณ' }
    };
}

function generateQuestion_random_variables() {
    var types = ['expected_value', 'binomial_mean', 'normal_z'];
    var type = randomChoice(types);
    var questionText, correctAnswer, traps, steps;

    if (type === 'expected_value') {
        var vals = [randomInt(0, 5), randomInt(5, 10), randomInt(10, 20)];
        var probs = [];
        var remaining = 100;
        probs.push(randomInt(20, 40));
        remaining -= probs[0];
        probs.push(randomInt(20, remaining - 10));
        remaining -= probs[1];
        probs.push(remaining);
        var ev = 0;
        for (var i = 0; i < 3; i++) ev += vals[i] * (probs[i] / 100);
        correctAnswer = roundTo(ev, 2);
        var tableStr = vals.map(function(v, i) { return 'X=' + v + '(P=' + (probs[i] / 100) + ')'; }).join(', ');
        questionText = 'ตัวแปรสุ่ม X: ' + tableStr + ' จงหาค่าคาดหมาย E(X) (ทศนิยม 2 ตำแหน่ง)';
        traps = [
            { answer: roundTo((vals[0] + vals[1] + vals[2]) / 3, 2), tag: 'Formula_Confusion', feedback: 'E(X) = Σ xᵢ·P(xᵢ) ไม่ใช่ค่าเฉลี่ยธรรมดา' },
            { answer: vals[0] + vals[1] + vals[2], tag: 'Forgot_Step', feedback: 'ต้องคูณด้วยความน่าจะเป็นก่อนรวม' }
        ];
        steps = [
            'E(X) = Σ xᵢ · P(xᵢ)',
            '= ' + vals[0] + '×' + (probs[0] / 100) + ' + ' + vals[1] + '×' + (probs[1] / 100) + ' + ' + vals[2] + '×' + (probs[2] / 100),
            '= ' + roundTo(vals[0] * probs[0] / 100, 2) + ' + ' + roundTo(vals[1] * probs[1] / 100, 2) + ' + ' + roundTo(vals[2] * probs[2] / 100, 2),
            'E(X) = ' + correctAnswer
        ];
    } else if (type === 'binomial_mean') {
        var nBin = randomInt(5, 15);
        var p = roundTo(randomChoice([1, 2, 3, 4]) / 10, 1);
        correctAnswer = roundTo(nBin * p, 2);
        questionText = 'การแจกแจงทวินาม n = ' + nBin + ', p = ' + p + ' จงหาค่าคาดหมาย E(X)';
        traps = [
            { answer: roundTo(nBin / p, 2), tag: 'Operation_Swap', feedback: 'E(X) = np ใช้คูณ ไม่ใช่หาร' },
            { answer: roundTo(nBin * p * (1 - p), 2), tag: 'Concept_Mix', feedback: 'นี่คือความแปรปรวน Var(X) = np(1-p) ไม่ใช่ E(X) = np' }
        ];
        steps = [
            'การแจกแจงทวินาม B(n, p)',
            'E(X) = np = ' + nBin + ' × ' + p,
            'E(X) = ' + correctAnswer
        ];
    } else {
        var mu = randomInt(50, 100);
        var sigma = randomInt(5, 15);
        var x = mu + randomChoice([-2, -1, 1, 2]) * sigma;
        correctAnswer = (x - mu) / sigma;
        questionText = 'การแจกแจงปกติ μ = ' + mu + ', σ = ' + sigma + ' จงหาค่า Z ของ x = ' + x;
        traps = [
            { answer: (mu - x) / sigma, tag: 'Sign_Error', feedback: 'Z = (x-μ)/σ ไม่ใช่ (μ-x)/σ' },
            { answer: x - mu, tag: 'Forgot_Step', feedback: 'Z = (x-μ)/σ ต้องหารด้วย σ ด้วย' }
        ];
        steps = [
            'สูตร Z-score: Z = (x - μ) / σ',
            'Z = (' + x + ' - ' + mu + ') / ' + sigma,
            'Z = ' + (x - mu) + ' / ' + sigma,
            'Z = ' + correctAnswer
        ];
    }

    return {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { title: 'ตัวแปรสุ่ม' }
    };
}


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
        /* === บันทึก blindspot แยกตามบทเรียน เพื่อใช้ในระบบฝึกจุดอ่อน === */
        if (!data.blindspotByChapter) data.blindspotByChapter = {};
        if (!data.blindspotByChapter[chapterKey]) data.blindspotByChapter[chapterKey] = {};
        if (!data.blindspotByChapter[chapterKey][blindspotTag]) data.blindspotByChapter[chapterKey][blindspotTag] = 0;
        data.blindspotByChapter[chapterKey][blindspotTag]++;
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

/* ===== Developer Mode: กด Z 3 ครั้งเพื่อเปิด/ปิด ===== */
var devMode = false;
var devKeyBuffer = [];  /* เก็บเวลาที่กดปุ่ม Z */
var DEV_KEY_COUNT = 3;  /* จำนวนครั้งที่ต้องกด */
var DEV_KEY_TIMEOUT = 2000; /* ภายใน 2 วินาที */

/* ===== Practice Mode: ระบบฝึกจุดอ่อนอัจฉริยะ ===== */
var practiceMode = false;
var practiceFocusTags = []; /* blindspot tags ที่กำลังเน้นฝึก */

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
    /* ปิดโหมดฝึกจุดอ่อน เมื่อเริ่ม quiz ปกติ */
    practiceMode = false;
    document.getElementById('practice-banner').style.display = 'none';
    document.getElementById('quiz-chapter-name').textContent = findChapterName(ck);
    updateQuizScoreDisplay(); showPanel('quiz'); generateNewQuestion();
}

function practiceWeakness() {
    var data = loadAnalytics();

    /* === ขั้นตอน 1: วิเคราะห์ blindspot tags ที่ผู้ใช้ทำผิดบ่อยที่สุด === */
    var tagCounts = data.blindspotCounts || {};
    var tagList = [];
    for (var tag in tagCounts) tagList.push({ tag: tag, count: tagCounts[tag] });
    tagList.sort(function(a, b) { return b.count - a.count; });

    /* ถ้ายังไม่มีข้อมูล blindspot ให้ fallback ไปที่ระบบเดิม (ดูบทที่คะแนนต่ำ) */
    if (!tagList.length) {
        var wk = getWeakestChapters();
        if (!wk.length) { alert('ยังไม่มีข้อมูลเพียงพอ ลองทำแบบฝึกหัดอย่างน้อย 2-3 บทก่อน'); return; }
        var chosen = wk[0].key;
        if (!QUESTION_GENERATORS[chosen]) { alert('บทเรียนที่เลือกยังไม่มีคำถาม'); return; }
        practiceMode = true;
        practiceFocusTags = [];
        currentChapterKey = chosen; quizCorrect = 0; quizTotal = 0; currentStreak = 0;
        document.getElementById('quiz-chapter-name').textContent = '[ฝึกจุดอ่อน] ' + findChapterName(chosen);
        document.getElementById('practice-banner').style.display = 'block';
        document.getElementById('practice-focus-tag').textContent = 'บทที่คะแนนต่ำสุด';
        updateQuizScoreDisplay(); showPanel('quiz'); generateNewQuestion();
        return;
    }

    /* === ขั้นตอน 2: เลือก top 3 blindspot tags === */
    var topTags = tagList.slice(0, 3);
    practiceFocusTags = topTags.map(function(t) { return t.tag; });

    /* === ขั้นตอน 3: หาบทเรียนที่มี blindspot tags เหล่านี้มากที่สุด === */
    var chapterScores = {};
    var bbc = data.blindspotByChapter || {};
    for (var chKey in bbc) {
        if (!QUESTION_GENERATORS[chKey]) continue; /* ข้ามบทที่ไม่มี generator */
        var score = 0;
        for (var bTag in bbc[chKey]) {
            /* ให้น้ำหนักมากกว่าถ้า tag นั้นอยู่ใน top tags */
            var isTopTag = false;
            for (var ti = 0; ti < practiceFocusTags.length; ti++) {
                if (practiceFocusTags[ti] === bTag) { isTopTag = true; break; }
            }
            score += bbc[chKey][bTag] * (isTopTag ? 3 : 1);
        }
        if (score > 0) chapterScores[chKey] = score;
    }

    /* === ขั้นตอน 4: สุ่มเลือกบทด้วยน้ำหนัก (weighted random) === */
    var candidates = [], totalWeight = 0;
    for (var cKey in chapterScores) {
        candidates.push({ key: cKey, weight: chapterScores[cKey] });
        totalWeight += chapterScores[cKey];
    }

    /* ถ้าไม่มี candidate (ข้อมูลไม่ตรง) ให้ fallback */
    if (!candidates.length) {
        var wk2 = getWeakestChapters();
        if (!wk2.length) { alert('ยังไม่มีข้อมูลเพียงพอ'); return; }
        candidates = [{ key: wk2[0].key, weight: 1 }];
        totalWeight = 1;
    }

    var rand = Math.random() * totalWeight, cum = 0, chosenKey = candidates[0].key;
    for (var ci = 0; ci < candidates.length; ci++) {
        cum += candidates[ci].weight;
        if (rand <= cum) { chosenKey = candidates[ci].key; break; }
    }

    /* === ขั้นตอน 5: เริ่ม Practice Mode === */
    practiceMode = true;
    currentChapterKey = chosenKey; quizCorrect = 0; quizTotal = 0; currentStreak = 0;
    document.getElementById('quiz-chapter-name').textContent = '[ฝึกจุดอ่อน] ' + findChapterName(chosenKey);

    /* แสดงแบนเนอร์บอกว่ากำลังเน้นฝึกอะไร */
    var focusNames = [];
    for (var fi = 0; fi < practiceFocusTags.length; fi++) {
        focusNames.push(BLINDSPOT_TAG_NAMES[practiceFocusTags[fi]] || practiceFocusTags[fi]);
    }
    document.getElementById('practice-banner').style.display = 'block';
    document.getElementById('practice-focus-tag').textContent = focusNames.join(', ');

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

    /* === Developer Mode: อัพเดทแผง Dev Panel ทุกครั้งที่สร้างคำถามใหม่ === */
    updateDevPanel();
}

/* ===== ฟังก์ชันอัพเดทข้อมูลใน Developer Panel ===== */
function updateDevPanel() {
    var panel = document.getElementById('dev-panel');
    if (!panel) return;
    /* แสดง/ซ่อนตาม devMode */
    panel.style.display = devMode ? 'block' : 'none';
    if (!devMode || !currentQuestion) return;

    /* แสดงคำตอบที่ถูกต้อง */
    document.getElementById('dev-correct-answer').textContent = currentQuestion.correctAnswer;
    document.getElementById('dev-tolerance').textContent = '(±' + (currentQuestion.tolerance || 0.01) + ')';

    /* แสดงขั้นตอนวิธีทำ */
    var stepsEl = document.getElementById('dev-solution-steps');
    var steps = currentQuestion.steps || [];
    var stepsHtml = '';
    for (var i = 0; i < steps.length; i++) stepsHtml += '<li>' + steps[i] + '</li>';
    stepsEl.innerHTML = stepsHtml;

    /* แสดง Blindspot Traps ทั้งหมด */
    var trapListEl = document.getElementById('dev-trap-list');
    var traps = currentQuestion.traps || [];
    var trapsHtml = '';
    for (var j = 0; j < traps.length; j++) {
        var trap = traps[j];
        var tagName = BLINDSPOT_TAG_NAMES[trap.tag] || trap.tag;
        trapsHtml += '<div class="dev-trap-item">';
        trapsHtml += '<span class="trap-answer">คำตอบผิด: ' + trap.answer + '</span>';
        trapsHtml += '<span class="trap-tag">' + tagName + ' (' + trap.tag + ')</span>';
        trapsHtml += '<div class="trap-feedback">' + trap.feedback + '</div>';
        trapsHtml += '</div>';
    }
    if (!traps.length) trapsHtml = '<p style="color:#64748b;font-size:13px;">ไม่มี trap สำหรับคำถามนี้</p>';
    trapListEl.innerHTML = trapsHtml;
}

/* ===== ฟังก์ชันเปิด/ปิด Developer Mode ===== */
function toggleDevMode() {
    devMode = !devMode;
    var badge = document.getElementById('dev-mode-badge');
    if (badge) badge.style.display = devMode ? 'block' : 'none';
    /* อัพเดท dev panel ทันที */
    updateDevPanel();
    /* แจ้งผู้ใช้ */
    if (devMode) {
        console.log('%c[DEV MODE ACTIVATED]', 'color: #dc2626; font-size: 16px; font-weight: bold;');
    } else {
        console.log('%c[DEV MODE DEACTIVATED]', 'color: #64748b; font-size: 14px;');
        var panel = document.getElementById('dev-panel');
        if (panel) panel.style.display = 'none';
    }
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

    /* ===== Developer Mode: ตรวจจับการกดปุ่ม Z 3 ครั้ง ===== */
    /* กด Z 3 ครั้งภายใน 2 วินาที เพื่อเปิด/ปิด Developer Mode */
    document.addEventListener('keydown', function(e) {
        /* ไม่ตรวจจับถ้ากำลังพิมพ์ในช่อง input */
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'z' || e.key === 'Z') {
            var now = Date.now();
            devKeyBuffer.push(now);
            /* ลบ keypresses ที่เก่าเกิน timeout */
            while (devKeyBuffer.length > 0 && now - devKeyBuffer[0] > DEV_KEY_TIMEOUT) {
                devKeyBuffer.shift();
            }
            /* ถ้ากดครบ 3 ครั้ง ให้ toggle dev mode */
            if (devKeyBuffer.length >= DEV_KEY_COUNT) {
                devKeyBuffer = [];
                toggleDevMode();
            }
        }
    });
});
