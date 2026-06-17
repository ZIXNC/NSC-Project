/* app.js */
/* ระบบวิเคราะห์จุดบอดทางคณิตศาสตร์ */
/* สำหรับการแข่งขันวันคณิตศาสตร์ */

// --- ฟังก์ชันพื้นฐาน ---

function randomInt(min, max) {
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}

function randomChoice(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function roundTo(num, decimals) {
    var factor = Math.pow(10, decimals);
    var result = Math.round(num * factor) / factor;
    return result;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        var temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    var result = Math.abs(a * b) / gcd(a, b);
    return result;
}

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    var result = 1;
    for (var i = 2; i <= n; i++) {
        result = result * i;
    }
    return result;
}

function combination(n, r) {
    if (r > n || r < 0) {
        return 0;
    }
    var result = factorial(n) / (factorial(r) * factorial(n - r));
    return result;
}

// --- โครงสร้างหลักสูตร ม.1 ถึง ม.6 ---

var CURRICULUM = {
    'M.1': {
        name: 'มัธยมศึกษาปีที่ 1',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'integers', name: 'จำนวนเต็ม' },
                    { key: 'decimals_fractions', name: 'ทศนิยมและเศษส่วน' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'linear_equations_1', name: 'สมการเชิงเส้นตัวแปรเดียว' },
                    { key: 'ratios', name: 'อัตราส่วน สัดส่วน และร้อยละ' }
                ]
            }
        }
    },
    'M.2': {
        name: 'มัธยมศึกษาปีที่ 2',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'pythagorean', name: 'ทฤษฎีบทพีทาโกรัส' }
                ]
            },
            'เทอม 2': {
                chapters: [
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
                    { key: 'linear_inequalities', name: 'อสมการเชิงเส้นตัวแปรเดียว' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'probability_1', name: 'ความน่าจะเป็น' }
                ]
            }
        }
    },
    'M.4': {
        name: 'มัธยมศึกษาปีที่ 4',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'sets', name: 'เซต' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'exp_log', name: 'เลขยกกำลังและลอการิทึม' }
                ]
            }
        }
    },
    'M.5': {
        name: 'มัธยมศึกษาปีที่ 5',
        terms: {
            'เทอม 1': {
                chapters: [
                    { key: 'vectors', name: 'เวกเตอร์ในสองมิติ' }
                ]
            },
            'เทอม 2': {
                chapters: [
                    { key: 'counting_principles', name: 'หลักการนับเบื้องต้น' }
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
                    { key: 'locked_chapter', name: 'ยังไม่ปลดล็อค' }
                ]
            }
        }
    }
};

// --- ชื่อประเภทจุดบอด (ภาษาไทย) ---

var BLINDSPOT_TAG_NAMES = {
    'Sign_Error': 'ผิดเครื่องหมาย',
    'Operation_Swap': 'สับสนการดำเนินการ',
    'Formula_Confusion': 'สับสนสูตร',
    'Order_Error': 'สลับลำดับ',
    'Forgot_Step': 'ลืมขั้นตอน',
    'Concept_Mix': 'สับสนแนวคิด',
    'Inverse_Error': 'กลับเศษส่วน'
};

var BLINDSPOT_BAR_CLASS = {
    'Sign_Error': 'bar-sign',
    'Operation_Swap': 'bar-operation',
    'Formula_Confusion': 'bar-formula',
    'Order_Error': 'bar-order',
    'Forgot_Step': 'bar-forgot',
    'Concept_Mix': 'bar-concept',
    'Inverse_Error': 'bar-inverse'
};

// ============================================
// ตัวสร้างโจทย์
// แต่ละบทมี 1-2 รูปแบบโจทย์
// ============================================

// --- ม.1 เทอม 1: จำนวนเต็ม ---
function generateQuestion_integers() {
    var coinFlip = randomInt(0, 1);
    var a = randomInt(-15, 15);
    var b = randomInt(-15, 15);
    if (b === 0) { b = 3; }

    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];

    if (coinFlip === 0) {
        correctAnswer = a + b;
        questionText = 'จงหาผลลัพธ์ของ (' + a + ') + (' + b + ')';
        traps = [
            { answer: a - b, tag: 'Operation_Swap', feedback: 'คุณอาจสับสนระหว่างการบวกกับการลบ' },
            { answer: -(a + b), tag: 'Sign_Error', feedback: 'ระวังเครื่องหมาย ผลบวกไม่ต้องกลับเครื่องหมาย' }
        ];
        steps = [
            'โจทย์: (' + a + ') + (' + b + ')',
            'นำตัวเลขมาบวกกัน โดยดูเครื่องหมาย',
            'ผลลัพธ์ = ' + correctAnswer
        ];
    } else {
        correctAnswer = a - b;
        questionText = 'จงหาผลลัพธ์ของ (' + a + ') - (' + b + ')';
        traps = [
            { answer: a + b, tag: 'Operation_Swap', feedback: 'การลบ คือการบวกด้วยจำนวนตรงข้าม' },
            { answer: b - a, tag: 'Order_Error', feedback: 'ระวังลำดับ (' + a + ') - (' + b + ') ไม่เท่ากับ (' + b + ') - (' + a + ')' }
        ];
        steps = [
            'โจทย์: (' + a + ') - (' + b + ')',
            'เปลี่ยนเป็นการบวก: (' + a + ') + (' + (-b) + ')',
            'ผลลัพธ์ = ' + correctAnswer
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { a: a, b: b, operation: (coinFlip === 0 ? 'add' : 'subtract') }
    };
    return result;
}

// --- ม.1 เทอม 1: ทศนิยมและเศษส่วน ---
function generateQuestion_decimals_fractions() {
    var d1 = randomChoice([2, 3, 4, 5, 6]);
    var d2 = randomChoice([2, 3, 4, 5, 6]);
    var n1 = randomInt(1, d1 - 1);
    var n2 = randomInt(1, d2 - 1);
    if (n1 < 1) { n1 = 1; }
    if (n2 < 1) { n2 = 1; }

    var commonD = lcm(d1, d2);
    var newN1 = n1 * (commonD / d1);
    var newN2 = n2 * (commonD / d2);
    var resultN = newN1 + newN2;
    var correctAnswer = roundTo(resultN / commonD, 4);

    var questionText = 'จงหาผลบวก ' + n1 + '/' + d1 + ' + ' + n2 + '/' + d2 + ' ตอบเป็นทศนิยมหรือเศษส่วน';

    var wrongAnswer1 = roundTo((n1 + n2) / (d1 + d2), 4);
    var wrongAnswer2 = roundTo((n1 * n2) / (d1 * d2), 4);

    var traps = [
        { answer: wrongAnswer1, tag: 'Formula_Confusion', feedback: 'การบวกเศษส่วนต้องทำตัวส่วนให้เท่ากันก่อน ไม่ใช่บวกเศษบวกเศษ ส่วนบวกส่วน' },
        { answer: wrongAnswer2, tag: 'Operation_Swap', feedback: 'โจทย์ถามผลบวก ไม่ใช่ผลคูณ' }
    ];

    var steps = [
        'โจทย์: ' + n1 + '/' + d1 + ' + ' + n2 + '/' + d2,
        'หา ค.ร.น. ของ ' + d1 + ' กับ ' + d2 + ' = ' + commonD,
        'ทำส่วนเท่ากัน: ' + newN1 + '/' + commonD + ' + ' + newN2 + '/' + commonD,
        'บวกเศษ: ' + resultN + '/' + commonD + ' = ' + correctAnswer
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'fraction_bar',
        visualData: { numerator: resultN, denominator: commonD }
    };
    return result;
}

// --- ม.1 เทอม 2: สมการเชิงเส้นตัวแปรเดียว ---
function generateQuestion_linear_equations_1() {
    var a = randomInt(2, 8);
    var x = randomInt(-8, 8);
    var b = randomInt(-10, 10);
    var c = a * x + b;
    var correctAnswer = x;

    var questionText = 'จงแก้สมการ ';
    if (b >= 0) {
        questionText = questionText + a + 'x + ' + b + ' = ' + c + ' หาค่า x';
    } else {
        questionText = questionText + a + 'x - ' + Math.abs(b) + ' = ' + c + ' หาค่า x';
    }

    var trap1answer = roundTo((c + b) / a, 2);
    var trap2answer = roundTo(c / a, 2);

    var traps = [
        { answer: trap1answer, tag: 'Sign_Error', feedback: 'ย้ายข้างต้องเปลี่ยนเครื่องหมาย' },
        { answer: trap2answer, tag: 'Forgot_Step', feedback: 'ต้องย้าย ' + b + ' ไปอีกข้างก่อน แล้วค่อยหาร ' + a }
    ];

    var steps = [];
    if (b >= 0) {
        steps.push('สมการ: ' + a + 'x + ' + b + ' = ' + c);
        steps.push('ย้าย ' + b + ' ไปอีกข้าง: ' + a + 'x = ' + c + ' - ' + b + ' = ' + (c - b));
    } else {
        steps.push('สมการ: ' + a + 'x - ' + Math.abs(b) + ' = ' + c);
        steps.push('ย้าย ' + Math.abs(b) + ' ไปอีกข้าง: ' + a + 'x = ' + c + ' + ' + Math.abs(b) + ' = ' + (c - b));
    }
    steps.push('หารทั้งสองข้างด้วย ' + a + ': x = ' + (c - b) + ' / ' + a + ' = ' + correctAnswer);

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'balance_scale',
        visualData: { a: a, b: b, c: c }
    };
    return result;
}

// --- ม.1 เทอม 2: อัตราส่วน สัดส่วน และร้อยละ ---
function generateQuestion_ratios() {
    var pct = randomChoice([10, 20, 25, 50, 75]);
    var total = randomChoice([100, 200, 400, 500, 1000]);
    var correctAnswer = (pct / 100) * total;

    var questionText = 'ร้อยละ ' + pct + ' ของ ' + total + ' มีค่าเท่ากับเท่าไร';

    var traps = [
        { answer: total / pct, tag: 'Inverse_Error', feedback: 'ต้องเอา ' + pct + ' หาร 100 แล้วคูณ ' + total + ' ไม่ใช่เอา ' + total + ' หาร ' + pct },
        { answer: pct + total, tag: 'Operation_Swap', feedback: 'ร้อยละต้องแปลงเป็นทศนิยมแล้วคูณ ไม่ใช่บวก' }
    ];

    var steps = [
        'ร้อยละ ' + pct + ' ของ ' + total,
        'แปลง ร้อยละ ' + pct + ' เป็นทศนิยม: ' + (pct / 100),
        'คูณ: ' + (pct / 100) + ' x ' + total + ' = ' + correctAnswer
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: ['ทั้งหมด', 'ร้อยละ ' + pct], values: [total, correctAnswer] }
    };
    return result;
}

// --- ม.2 เทอม 1: ทฤษฎีบทพีทาโกรัส ---
function generateQuestion_pythagorean() {
    var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
    var picked = randomChoice(triples);
    var sideA = picked[0];
    var sideB = picked[1];
    var sideC = picked[2];

    var askHyp = randomInt(0, 1);
    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];
    var sideLabels = [];

    if (askHyp === 1) {
        correctAnswer = sideC;
        questionText = 'สามเหลี่ยมมุมฉากมีด้านประกอบมุมฉากยาว ' + sideA + ' และ ' + sideB + ' จงหาด้านตรงข้ามมุมฉาก';
        traps = [
            { answer: sideA + sideB, tag: 'Formula_Confusion', feedback: 'ด้านตรงข้ามมุมฉากหาจากรากที่สองของผลรวมกำลังสอง ไม่ใช่ผลบวก' },
            { answer: sideA * sideB, tag: 'Operation_Swap', feedback: 'ใช้ทฤษฎีบทพีทาโกรัส ไม่ใช่การคูณ' }
        ];
        sideLabels = [sideA + '', sideB + '', '?'];
        steps = [
            'ใช้ทฤษฎีบทพีทาโกรัส: ด้านตรงข้ามยกกำลังสอง = ผลรวมกำลังสองของด้านประกอบ',
            sideA + ' ยกกำลังสอง + ' + sideB + ' ยกกำลังสอง = ' + (sideA * sideA) + ' + ' + (sideB * sideB) + ' = ' + (sideA * sideA + sideB * sideB),
            'รากที่สองของ ' + (sideA * sideA + sideB * sideB) + ' = ' + sideC
        ];
    } else {
        correctAnswer = sideA;
        questionText = 'สามเหลี่ยมมุมฉากมีด้านตรงข้ามมุมฉากยาว ' + sideC + ' ด้านหนึ่งยาว ' + sideB + ' จงหาอีกด้านหนึ่ง';
        traps = [
            { answer: sideC - sideB, tag: 'Formula_Confusion', feedback: 'ต้องยกกำลังสองก่อนแล้วหารากที่สอง ไม่ใช่ลบตรงๆ' },
            { answer: roundTo(Math.sqrt(sideC * sideC + sideB * sideB), 2), tag: 'Sign_Error', feedback: 'หาด้านประกอบมุมฉาก ต้องลบกำลังสอง ไม่ใช่บวก' }
        ];
        sideLabels = ['?', sideB + '', sideC + ''];
        steps = [
            'ใช้ทฤษฎีบทพีทาโกรัส: ด้านประกอบยกกำลังสอง = ด้านตรงข้ามยกกำลังสอง ลบ อีกด้านยกกำลังสอง',
            sideC + ' ยกกำลังสอง - ' + sideB + ' ยกกำลังสอง = ' + (sideC * sideC) + ' - ' + (sideB * sideB) + ' = ' + (sideC * sideC - sideB * sideB),
            'รากที่สองของ ' + (sideC * sideC - sideB * sideB) + ' = ' + sideA
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'triangle',
        visualData: { sides: [sideA, sideB, sideC], labels: sideLabels }
    };
    return result;
}

// --- ม.2 เทอม 2: การแยกตัวประกอบพหุนามดีกรีสอง ---
function generateQuestion_factoring_2() {
    var p = randomInt(-8, 8);
    var q = randomInt(-8, 8);
    if (p === 0) { p = 2; }
    if (q === 0) { q = -3; }

    var bCoeff = p + q;
    var cCoeff = p * q;
    var correctAnswer = bCoeff;

    var questionText = 'ถ้า x ยกกำลังสอง ';
    if (bCoeff >= 0) {
        questionText = questionText + '+ ' + bCoeff + 'x ';
    } else {
        questionText = questionText + '- ' + Math.abs(bCoeff) + 'x ';
    }
    if (cCoeff >= 0) {
        questionText = questionText + '+ ' + cCoeff;
    } else {
        questionText = questionText + '- ' + Math.abs(cCoeff);
    }
    questionText = questionText + ' แยกตัวประกอบได้ (x + a)(x + b) จงหาค่า a + b';

    var traps = [
        { answer: cCoeff, tag: 'Concept_Mix', feedback: 'a + b คือสัมประสิทธิ์ของ x ไม่ใช่ค่าคงที่ (a คูณ b = ' + cCoeff + ')' },
        { answer: -bCoeff, tag: 'Sign_Error', feedback: 'ระวังเครื่องหมาย a + b = ' + bCoeff + ' ไม่ใช่ ' + (-bCoeff) }
    ];

    var steps = [
        'พหุนาม: x ยกกำลังสอง + (' + bCoeff + ')x + (' + cCoeff + ')',
        'แยกตัวประกอบ: (x + a)(x + b) = x ยกกำลังสอง + (a+b)x + ab',
        'ดังนั้น a + b = ' + bCoeff + ' และ a คูณ b = ' + cCoeff,
        'คำตอบ: a + b = ' + correctAnswer
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'default',
        visualData: { text: 'x^2 + (' + bCoeff + ')x + (' + cCoeff + ')' }
    };
    return result;
}

// --- ม.3 เทอม 1: อสมการเชิงเส้นตัวแปรเดียว ---
function generateQuestion_linear_inequalities() {
    var a = randomInt(2, 7);
    var b = randomInt(-10, 10);
    var c = randomInt(-15, 15);
    var boundary = roundTo((c - b) / a, 2);
    var correctAnswer = boundary;

    var questionText = 'จงหาค่าขอบเขตของ x จากอสมการ ' + a + 'x';
    if (b >= 0) {
        questionText = questionText + ' + ' + b + ' > ' + c;
    } else {
        questionText = questionText + ' - ' + Math.abs(b) + ' > ' + c;
    }
    questionText = questionText + ' (ตอบค่าขอบเขต x > ?)';

    var traps = [
        { answer: roundTo(c / a, 2), tag: 'Forgot_Step', feedback: 'ต้องย้าย ' + b + ' ไปอีกข้างก่อน' },
        { answer: roundTo((c + b) / a, 2), tag: 'Sign_Error', feedback: 'ย้ายข้างต้องเปลี่ยนเครื่องหมาย' }
    ];

    var steps = [];
    if (b >= 0) {
        steps.push('อสมการ: ' + a + 'x + ' + b + ' > ' + c);
        steps.push('ย้าย ' + b + ': ' + a + 'x > ' + c + ' - ' + b + ' = ' + (c - b));
    } else {
        steps.push('อสมการ: ' + a + 'x - ' + Math.abs(b) + ' > ' + c);
        steps.push('ย้าย ' + Math.abs(b) + ': ' + a + 'x > ' + c + ' + ' + Math.abs(b) + ' = ' + (c - b));
    }
    steps.push('หาร ' + a + ': x > ' + boundary);

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'number_line',
        visualData: { a: boundary, b: 0, operation: 'inequality' }
    };
    return result;
}

// --- ม.3 เทอม 2: ความน่าจะเป็น ---
function generateQuestion_probability_1() {
    var coinFlip = randomInt(0, 1);
    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];

    if (coinFlip === 0) {
        var target = randomInt(1, 6);
        correctAnswer = roundTo(1 / 6, 4);
        questionText = 'โยนลูกเต๋า 1 ลูก จงหาความน่าจะเป็นที่จะได้แต้ม ' + target + ' ตอบเป็นทศนิยมหรือเศษส่วน';
        traps = [
            { answer: roundTo(target / 6, 4), tag: 'Concept_Mix', feedback: 'ความน่าจะเป็น = จำนวนผลลัพธ์ที่ต้องการ หาร จำนวนผลลัพธ์ทั้งหมด = 1/6' },
            { answer: roundTo(1 / target, 4), tag: 'Inverse_Error', feedback: 'ตัวส่วนคือผลลัพธ์ทั้งหมด (6) ไม่ใช่แต้มที่ต้องการ' }
        ];
        steps = [
            'ลูกเต๋ามี 6 หน้า',
            'ผลลัพธ์ที่ต้องการ (แต้ม ' + target + ') = 1 แบบ',
            'ความน่าจะเป็น = 1/6 = ' + correctAnswer
        ];
    } else {
        var red = randomInt(2, 5);
        var blue = randomInt(2, 5);
        var totalBalls = red + blue;
        correctAnswer = roundTo(red / totalBalls, 4);
        questionText = 'กล่องมีลูกบอลสีแดง ' + red + ' ลูก สีน้ำเงิน ' + blue + ' ลูก หยิบมา 1 ลูก จงหาความน่าจะเป็นที่จะได้สีแดง ตอบเป็นทศนิยมหรือเศษส่วน';
        traps = [
            { answer: roundTo(red / blue, 4), tag: 'Formula_Confusion', feedback: 'ตัวส่วนคือจำนวนทั้งหมด (' + totalBalls + ') ไม่ใช่จำนวนสีน้ำเงิน' },
            { answer: roundTo(blue / totalBalls, 4), tag: 'Concept_Mix', feedback: 'โจทย์ถามสีแดง ไม่ใช่สีน้ำเงิน' }
        ];
        steps = [
            'ลูกบอลทั้งหมด = ' + red + ' + ' + blue + ' = ' + totalBalls + ' ลูก',
            'ลูกบอลสีแดง = ' + red + ' ลูก',
            'ความน่าจะเป็น = ' + red + '/' + totalBalls + ' = ' + correctAnswer
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: ['ทั้งหมด', 'ที่ต้องการ'], values: [coinFlip === 0 ? 6 : (red + blue), coinFlip === 0 ? 1 : red] }
    };
    return result;
}

// --- ม.4 เทอม 1: เซต ---
function generateQuestion_sets() {
    var nA = randomInt(3, 8);
    var nB = randomInt(3, 8);
    var nIntersect = randomInt(1, Math.min(nA, nB) - 1);
    var nUnion = nA + nB - nIntersect;

    var coinFlip = randomInt(0, 1);
    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];

    if (coinFlip === 0) {
        correctAnswer = nUnion;
        questionText = 'เซต A มีสมาชิก ' + nA + ' ตัว เซต B มีสมาชิก ' + nB + ' ตัว อินเตอร์เซกชันของ A กับ B มี ' + nIntersect + ' ตัว จงหาจำนวนสมาชิกของยูเนียนของ A กับ B';
        traps = [
            { answer: nA + nB, tag: 'Forgot_Step', feedback: 'ต้องลบส่วนที่ซ้ำออก: จำนวนสมาชิกยูเนียน = จำนวน A + จำนวน B - จำนวนอินเตอร์เซกชัน' },
            { answer: nIntersect, tag: 'Concept_Mix', feedback: 'โจทย์ถามยูเนียน ไม่ใช่อินเตอร์เซกชัน' }
        ];
        steps = [
            'จำนวนสมาชิก A = ' + nA + ', จำนวนสมาชิก B = ' + nB + ', อินเตอร์เซกชัน = ' + nIntersect,
            'จำนวนสมาชิกยูเนียน = จำนวน A + จำนวน B - อินเตอร์เซกชัน',
            '= ' + nA + ' + ' + nB + ' - ' + nIntersect + ' = ' + nUnion
        ];
    } else {
        var onlyA = nA - nIntersect;
        correctAnswer = onlyA;
        questionText = 'เซต A มีสมาชิก ' + nA + ' ตัว อินเตอร์เซกชันของ A กับ B มี ' + nIntersect + ' ตัว จงหาจำนวนสมาชิกที่อยู่ใน A อย่างเดียว';
        traps = [
            { answer: nA, tag: 'Forgot_Step', feedback: 'ต้องลบส่วนที่ซ้ำออก: สมาชิก A อย่างเดียว = จำนวน A - อินเตอร์เซกชัน' },
            { answer: nIntersect, tag: 'Concept_Mix', feedback: 'โจทย์ถามสมาชิกที่อยู่ใน A อย่างเดียว ไม่ใช่ส่วนที่ซ้ำ' }
        ];
        steps = [
            'จำนวนสมาชิก A = ' + nA + ', อินเตอร์เซกชัน = ' + nIntersect,
            'สมาชิก A อย่างเดียว = จำนวน A - อินเตอร์เซกชัน',
            '= ' + nA + ' - ' + nIntersect + ' = ' + onlyA
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: ['A', 'B', 'ส่วนร่วม'], values: [nA, nB, nIntersect] }
    };
    return result;
}

// --- ม.4 เทอม 2: เลขยกกำลังและลอการิทึม ---
function generateQuestion_exp_log() {
    var base = randomChoice([2, 3, 5, 10]);
    var exp = randomInt(1, 4);
    var val = Math.pow(base, exp);
    var correctAnswer = exp;

    var questionText = 'จงหาค่าของลอการิทึมฐาน ' + base + ' ของ ' + val;

    var traps = [
        { answer: val / base, tag: 'Concept_Mix', feedback: 'ลอการิทึมฐาน ' + base + ' ของ ' + val + ' คือเลขยกกำลังที่ทำให้ ' + base + ' ยกกำลัง ? = ' + val },
        { answer: base, tag: 'Concept_Mix', feedback: 'คำตอบคือเลขยกกำลัง ไม่ใช่ฐาน' }
    ];

    var steps = [
        'ลอการิทึมฐาน ' + base + ' ของ ' + val + ' = ?',
        'หมายความว่า ' + base + ' ยกกำลัง ? = ' + val,
        base + ' ยกกำลัง ' + exp + ' = ' + val,
        'ดังนั้น คำตอบ = ' + exp
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'default',
        visualData: { text: 'ลอการิทึมฐาน ' + base + ' ของ ' + val + ' = ?' }
    };
    return result;
}

// --- ม.5 เทอม 1: เวกเตอร์ในสองมิติ ---
function generateQuestion_vectors() {
    var coinFlip = randomInt(0, 1);
    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];

    if (coinFlip === 0) {
        var vx = randomInt(1, 8);
        var vy = randomInt(1, 8);
        correctAnswer = roundTo(Math.sqrt(vx * vx + vy * vy), 2);
        questionText = 'เวกเตอร์ v = (' + vx + ', ' + vy + ') จงหาขนาดของเวกเตอร์ ตอบทศนิยม 2 ตำแหน่ง';
        traps = [
            { answer: vx + vy, tag: 'Formula_Confusion', feedback: 'ขนาดเวกเตอร์ = รากที่สองของ (x ยกกำลังสอง + y ยกกำลังสอง) ไม่ใช่ x + y' },
            { answer: vx * vy, tag: 'Operation_Swap', feedback: 'ใช้สูตรรากที่สอง ไม่ใช่การคูณ' }
        ];
        steps = [
            'เวกเตอร์ v = (' + vx + ', ' + vy + ')',
            'ขนาด = รากที่สองของ (' + vx + ' ยกกำลังสอง + ' + vy + ' ยกกำลังสอง)',
            '= รากที่สองของ (' + (vx * vx) + ' + ' + (vy * vy) + ') = รากที่สองของ ' + (vx * vx + vy * vy),
            '= ' + correctAnswer
        ];
    } else {
        var ax = randomInt(-5, 5);
        var ay = randomInt(-5, 5);
        var bx = randomInt(-5, 5);
        var by = randomInt(-5, 5);
        correctAnswer = ax + bx;
        questionText = 'ถ้า a = (' + ax + ', ' + ay + ') และ b = (' + bx + ', ' + by + ') จงหาองค์ประกอบแนวนอนของ a + b';
        traps = [
            { answer: ay + by, tag: 'Concept_Mix', feedback: 'โจทย์ถามองค์ประกอบแนวนอน ไม่ใช่แนวตั้ง' },
            { answer: ax - bx, tag: 'Operation_Swap', feedback: 'โจทย์ถาม a + b ไม่ใช่ a - b' }
        ];
        steps = [
            'a = (' + ax + ', ' + ay + '), b = (' + bx + ', ' + by + ')',
            'a + b = (' + ax + ' + ' + bx + ', ' + ay + ' + ' + by + ')',
            'องค์ประกอบแนวนอน = ' + ax + ' + ' + bx + ' = ' + correctAnswer
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'default',
        visualData: { text: 'เวกเตอร์ในสองมิติ' }
    };
    return result;
}

// --- ม.5 เทอม 2: หลักการนับเบื้องต้น ---
function generateQuestion_counting_principles() {
    var coinFlip = randomInt(0, 1);
    var questionText = '';
    var correctAnswer = 0;
    var traps = [];
    var steps = [];

    if (coinFlip === 0) {
        var n = randomInt(4, 7);
        var r = randomInt(2, 3);
        correctAnswer = factorial(n) / factorial(n - r);
        questionText = 'มีของ ' + n + ' ชิ้น เลือกมาเรียง ' + r + ' ชิ้น สนใจลำดับ ได้กี่วิธี';
        traps = [
            { answer: combination(n, r), tag: 'Concept_Mix', feedback: 'โจทย์นี้สนใจลำดับ ใช้สูตรการเรียงสับเปลี่ยน ไม่ใช่การจัดหมู่' },
            { answer: n * r, tag: 'Formula_Confusion', feedback: 'การเรียงสับเปลี่ยน = n! / (n-r)! ไม่ใช่ n คูณ r' }
        ];
        steps = [
            'การเรียงสับเปลี่ยน(' + n + ', ' + r + ') = ' + n + '! / (' + n + '-' + r + ')!',
            '= ' + n + '! / ' + (n - r) + '!',
            '= ' + correctAnswer
        ];
    } else {
        var n2 = randomInt(4, 8);
        var r2 = randomInt(2, 3);
        correctAnswer = combination(n2, r2);
        questionText = 'มีของ ' + n2 + ' ชิ้น เลือกมา ' + r2 + ' ชิ้น ไม่สนใจลำดับ ได้กี่วิธี';
        traps = [
            { answer: factorial(n2) / factorial(n2 - r2), tag: 'Concept_Mix', feedback: 'โจทย์ไม่สนใจลำดับ ใช้สูตรการจัดหมู่ ไม่ใช่การเรียงสับเปลี่ยน' },
            { answer: n2 * r2, tag: 'Formula_Confusion', feedback: 'การจัดหมู่ = n! / (r! คูณ (n-r)!) ไม่ใช่ n คูณ r' }
        ];
        steps = [
            'การจัดหมู่(' + n2 + ', ' + r2 + ') = ' + n2 + '! / (' + r2 + '! คูณ (' + n2 + '-' + r2 + ')!)',
            '= ' + n2 + '! / (' + r2 + '! คูณ ' + (n2 - r2) + '!)',
            '= ' + correctAnswer
        ];
    }

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'default',
        visualData: { text: 'หลักการนับ' }
    };
    return result;
}

// --- ม.6 เทอม 1: ลำดับและอนุกรม ---
function generateQuestion_sequences_series() {
    var a1 = randomInt(1, 10);
    var d = randomInt(2, 6);
    var n = randomInt(5, 12);
    var correctAnswer = a1 + (n - 1) * d;

    var questionText = 'ลำดับเลขคณิตมีพจน์แรกเท่ากับ ' + a1 + ' ผลต่างร่วมเท่ากับ ' + d + ' จงหาพจน์ที่ ' + n;

    var traps = [
        { answer: a1 + n * d, tag: 'Forgot_Step', feedback: 'สูตรพจน์ที่ n ใช้ (n-1) คูณ ผลต่างร่วม ไม่ใช่ n' },
        { answer: a1 * d * n, tag: 'Formula_Confusion', feedback: 'สูตรพจน์ที่ n = พจน์แรก + (n-1) คูณ ผลต่างร่วม ไม่ใช่การคูณทั้งหมด' }
    ];

    var steps = [
        'ลำดับเลขคณิต: พจน์แรก = ' + a1 + ', ผลต่างร่วม = ' + d,
        'สูตร: พจน์ที่ n = พจน์แรก + (n-1) คูณ ผลต่างร่วม',
        'พจน์ที่ ' + n + ' = ' + a1 + ' + (' + n + '-1) คูณ ' + d,
        '= ' + a1 + ' + ' + (n - 1) + ' คูณ ' + d + ' = ' + a1 + ' + ' + ((n - 1) * d),
        '= ' + correctAnswer
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'bar_chart',
        visualData: { labels: ['พจน์ 1', 'พจน์ 2', 'พจน์ 3'], values: [a1, a1 + d, a1 + 2 * d] }
    };
    return result;
}

// --- ม.6 เทอม 1: แคลคูลัสเบื้องต้น (อนุพันธ์ง่ายๆ) ---
function generateQuestion_calculus_intro() {
    // หาอนุพันธ์ของ ax^n
    var a = randomInt(2, 9);
    var n = randomInt(2, 5);
    // อนุพันธ์ของ ax^n = a*n * x^(n-1)
    // ถามหาสัมประสิทธิ์ของอนุพันธ์ = a * n
    var correctAnswer = a * n;

    var questionText = 'จงหาสัมประสิทธิ์ของอนุพันธ์ของ ' + a + 'x ยกกำลัง ' + n + ' เทียบกับ x (ผลลัพธ์คือ ?x ยกกำลัง ' + (n - 1) + ')';

    var traps = [
        { answer: a, tag: 'Forgot_Step', feedback: 'ต้องนำเลขชี้กำลังมาคูณสัมประสิทธิ์ด้วย: ' + a + ' คูณ ' + n + ' = ' + (a * n) },
        { answer: n, tag: 'Concept_Mix', feedback: 'อนุพันธ์ของ ax^n = a คูณ n คูณ x^(n-1) ไม่ใช่แค่ n' }
    ];

    var steps = [
        'โจทย์: หาอนุพันธ์ของ ' + a + 'x ยกกำลัง ' + n,
        'สูตร: อนุพันธ์ของ ax^n = a คูณ n คูณ x^(n-1)',
        'สัมประสิทธิ์ = ' + a + ' คูณ ' + n + ' = ' + correctAnswer,
        'ผลลัพธ์: ' + correctAnswer + 'x ยกกำลัง ' + (n - 1)
    ];

    var result = {
        questionText: questionText,
        correctAnswer: correctAnswer,
        tolerance: 0.01,
        traps: traps,
        steps: steps,
        visualType: 'default',
        visualData: { text: 'อนุพันธ์ของ ' + a + 'x^' + n + ' = ?' }
    };
    return result;
}

// --- ม.6 เทอม 2: ยังไม่ปลดล็อค (ไม่มีตัวสร้างโจทย์) ---
// ไม่มีฟังก์ชัน เพราะล็อคไว้

// --- แผนที่ตัวสร้างโจทย์ ---

var QUESTION_GENERATORS = {
    'integers': generateQuestion_integers,
    'decimals_fractions': generateQuestion_decimals_fractions,
    'linear_equations_1': generateQuestion_linear_equations_1,
    'ratios': generateQuestion_ratios,
    'pythagorean': generateQuestion_pythagorean,
    'factoring_2': generateQuestion_factoring_2,
    'linear_inequalities': generateQuestion_linear_inequalities,
    'probability_1': generateQuestion_probability_1,
    'sets': generateQuestion_sets,
    'exp_log': generateQuestion_exp_log,
    'vectors': generateQuestion_vectors,
    'counting_principles': generateQuestion_counting_principles,
    'sequences_series': generateQuestion_sequences_series,
    'calculus_intro': generateQuestion_calculus_intro
};

// --- คีย์เก็บข้อมูล ---
var STORAGE_KEY = 'blindspot_analyzer_data';

// --- ตัวแปรสถานะ ---
var currentPanel = 'home';
var currentChapterKey = '';
var currentQuestion = null;
var quizCorrect = 0;
var quizTotal = 0;
var currentStreak = 0;
var hasAnswered = false;

// --- บันทึก/โหลดข้อมูล ---

function loadData() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
        var emptyData = {
            history: [],
            blindspotCounts: {},
            chapterStats: {},
            bestStreak: 0
        };
        return emptyData;
    }
    try {
        var parsed = JSON.parse(raw);
        return parsed;
    } catch (e) {
        var emptyData2 = {
            history: [],
            blindspotCounts: {},
            chapterStats: {},
            bestStreak: 0
        };
        return emptyData2;
    }
}

function saveData(data) {
    var jsonStr = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonStr);
}

function recordAnswer(chapterKey, isCorrect, blindspotTag) {
    var data = loadData();

    var historyItem = {
        chapter: chapterKey,
        correct: isCorrect,
        tag: blindspotTag,
        time: Date.now()
    };
    data.history.push(historyItem);
    if (data.history.length > 200) {
        data.history.shift();
    }

    if (blindspotTag !== null && blindspotTag !== '') {
        if (data.blindspotCounts[blindspotTag] === undefined) {
            data.blindspotCounts[blindspotTag] = 0;
        }
        data.blindspotCounts[blindspotTag] = data.blindspotCounts[blindspotTag] + 1;
    }

    if (data.chapterStats[chapterKey] === undefined) {
        data.chapterStats[chapterKey] = { attempted: 0, correct: 0 };
    }
    data.chapterStats[chapterKey].attempted = data.chapterStats[chapterKey].attempted + 1;
    if (isCorrect) {
        data.chapterStats[chapterKey].correct = data.chapterStats[chapterKey].correct + 1;
    }

    if (currentStreak > data.bestStreak) {
        data.bestStreak = currentStreak;
    }

    saveData(data);
}

function getOverallStats() {
    var data = loadData();
    var totalAttempted = 0;
    var totalCorrect = 0;

    var keys = Object.keys(data.chapterStats);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        totalAttempted = totalAttempted + data.chapterStats[k].attempted;
        totalCorrect = totalCorrect + data.chapterStats[k].correct;
    }

    var accuracy = 0;
    if (totalAttempted > 0) {
        accuracy = Math.round((totalCorrect / totalAttempted) * 100);
    }

    var result = {
        total: totalAttempted,
        correct: totalCorrect,
        accuracy: accuracy,
        bestStreak: data.bestStreak
    };
    return result;
}

function getTopBlindspots(limit) {
    var data = loadData();
    var tags = Object.keys(data.blindspotCounts);

    // เรียงลำดับแบบง่าย
    for (var i = 0; i < tags.length; i++) {
        for (var j = i + 1; j < tags.length; j++) {
            if (data.blindspotCounts[tags[j]] > data.blindspotCounts[tags[i]]) {
                var temp = tags[i];
                tags[i] = tags[j];
                tags[j] = temp;
            }
        }
    }

    var result = [];
    for (var k = 0; k < tags.length && k < limit; k++) {
        result.push({ tag: tags[k], count: data.blindspotCounts[tags[k]] });
    }
    return result;
}

// ============================================
// การวาดภาพประกอบ
// สำคัญ: ห้ามแสดงคำตอบในภาพ!
// ============================================

function renderVisual(visualType, visualData) {
    var canvas = document.getElementById('visual-canvas');
    if (!canvas) {
        return;
    }
    var container = document.getElementById('visual-container');
    var containerWidth = 560;
    if (container) {
        containerWidth = container.clientWidth - 40;
        if (containerWidth < 300) { containerWidth = 300; }
        if (containerWidth > 600) { containerWidth = 600; }
    }
    canvas.width = containerWidth;
    canvas.height = 280;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (visualType === 'number_line') {
        drawNumberLine(ctx, canvas, visualData);
    } else if (visualType === 'fraction_bar') {
        drawFractionBar(ctx, canvas, visualData);
    } else if (visualType === 'balance_scale') {
        drawBalanceScale(ctx, canvas, visualData);
    } else if (visualType === 'bar_chart') {
        drawBarChart(ctx, canvas, visualData);
    } else if (visualType === 'triangle') {
        drawTriangle(ctx, canvas, visualData);
    } else {
        drawDefault(ctx, canvas, visualData);
    }
}

function drawNumberLine(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;
    var lineY = h / 2;
    var margin = 60;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, lineY);
    ctx.lineTo(w - margin, lineY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w - margin, lineY);
    ctx.lineTo(w - margin - 10, lineY - 6);
    ctx.moveTo(w - margin, lineY);
    ctx.lineTo(w - margin - 10, lineY + 6);
    ctx.stroke();

    var aVal = data.a;
    var bVal = data.b;
    var minVal = Math.min(aVal, bVal) - 3;
    var maxVal = Math.max(aVal, bVal) + 3;
    if (minVal > -5) { minVal = -5; }
    if (maxVal < 5) { maxVal = 5; }

    var range = maxVal - minVal;
    var lineWidth = w - 2 * margin;

    for (var i = minVal; i <= maxVal; i++) {
        var xPos = margin + ((i - minVal) / range) * lineWidth;
        ctx.beginPath();
        ctx.moveTo(xPos, lineY - 5);
        ctx.lineTo(xPos, lineY + 5);
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(i + '', xPos, lineY + 20);
    }

    var xA = margin + ((aVal - minVal) / range) * lineWidth;
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.arc(xA, lineY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('a = ' + aVal, xA, lineY - 15);

    if (data.operation !== 'inequality') {
        var xB = margin + ((bVal - minVal) / range) * lineWidth;
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(xB, lineY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('b = ' + bVal, xB, lineY - 15);
    }

    ctx.fillStyle = '#333';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    if (data.operation === 'add') {
        ctx.fillText('(' + aVal + ') + (' + bVal + ') = ?', w / 2, 30);
    } else if (data.operation === 'subtract') {
        ctx.fillText('(' + aVal + ') - (' + bVal + ') = ?', w / 2, 30);
    } else {
        ctx.fillText('x > ?', w / 2, 30);
    }
}

function drawFractionBar(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;
    var barX = 60;
    var barY = 80;
    var barW = w - 120;
    var barH = 50;
    var denominator = data.denominator;
    var numerator = data.numerator;

    ctx.fillStyle = '#333';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('แถบเศษส่วน (? / ' + denominator + ')', w / 2, 40);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barW, barH);

    var sliceW = barW / denominator;
    for (var i = 0; i < denominator; i++) {
        var sliceX = barX + i * sliceW;
        if (i < numerator) {
            ctx.fillStyle = '#85c1e9';
            ctx.fillRect(sliceX, barY, sliceW, barH);
        }
        if (i > 0) {
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sliceX, barY);
            ctx.lineTo(sliceX, barY + barH);
            ctx.stroke();
        }
    }

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = '#666';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('จำนวนส่วนที่แรเงา: ' + numerator + ' จาก ' + denominator + ' ส่วน', w / 2, barY + barH + 30);
}

function drawBalanceScale(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2, h - 40);
    ctx.lineTo(w / 2 - 30, h - 10);
    ctx.lineTo(w / 2 + 30, h - 10);
    ctx.closePath();
    ctx.stroke();

    var beamY = h - 80;
    ctx.beginPath();
    ctx.moveTo(80, beamY);
    ctx.lineTo(w - 80, beamY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, h - 40);
    ctx.lineTo(w / 2, beamY);
    ctx.stroke();

    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, beamY);
    ctx.lineTo(80, beamY + 20);
    ctx.lineTo(180, beamY + 20);
    ctx.lineTo(180, beamY);
    ctx.stroke();

    ctx.strokeStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(w - 180, beamY);
    ctx.lineTo(w - 180, beamY + 20);
    ctx.lineTo(w - 80, beamY + 20);
    ctx.lineTo(w - 80, beamY);
    ctx.stroke();

    var leftText = '';
    if (data.b >= 0) {
        leftText = data.a + 'x + ' + data.b;
    } else {
        leftText = data.a + 'x - ' + Math.abs(data.b);
    }
    var rightText = data.c + '';

    ctx.fillStyle = '#2980b9';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(leftText, 130, beamY + 50);

    ctx.fillStyle = '#e74c3c';
    ctx.fillText(rightText, w - 130, beamY + 50);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('x = ?', w / 2, 30);
}

function drawBarChart(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;
    var labels = data.labels;
    var values = data.values;
    var barCount = labels.length;
    var margin = 60;
    var barAreaW = w - margin * 2;
    var barW = barAreaW / (barCount * 2);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('แผนภูมิแท่ง', w / 2, 25);

    var maxVal = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] > maxVal) { maxVal = values[i]; }
    }
    if (maxVal === 0) { maxVal = 1; }

    var barAreaH = h - 100;
    var colors = ['#2980b9', '#27ae60', '#e67e22', '#8e44ad', '#e74c3c'];

    for (var j = 0; j < barCount; j++) {
        var barH = (values[j] / maxVal) * barAreaH;
        var barX = margin + j * (barAreaW / barCount) + (barAreaW / barCount - barW) / 2;
        var barY = h - 50 - barH;

        ctx.fillStyle = colors[j % colors.length];
        ctx.fillRect(barX, barY, barW, barH);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[j], barX + barW / 2, h - 30);

        if (j === 0) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(values[j] + '', barX + barW / 2, barY - 8);
        } else {
            ctx.fillStyle = '#999';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('?', barX + barW / 2, barY - 8);
        }
    }
}

function drawTriangle(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;
    var labels = data.labels;

    var x1 = 100;
    var y1 = h - 50;
    var x2 = w - 150;
    var y2 = h - 50;
    var x3 = 100;
    var y3 = 60;

    ctx.fillStyle = '#ebf5fb';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    var markSize = 15;
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1 + markSize, y1);
    ctx.lineTo(x1 + markSize, y1 - markSize);
    ctx.lineTo(x1, y1 - markSize);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(labels[0], x1 - 10, (y1 + y3) / 2);

    ctx.textAlign = 'center';
    ctx.fillText(labels[1], (x1 + x2) / 2, y1 + 25);

    ctx.textAlign = 'left';
    ctx.fillText(labels[2], (x2 + x3) / 2 + 10, (y2 + y3) / 2);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('สามเหลี่ยมมุมฉาก', w / 2, 25);
}

function drawDefault(ctx, canvas, data) {
    var w = canvas.width;
    var h = canvas.height;
    var text = '';
    if (data && data.text) {
        text = data.text;
    } else {
        text = 'โจทย์คณิตศาสตร์';
    }
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, h / 2);
}

// ============================================
// ตัวแปลงคำตอบเศษส่วน
// รับค่าแบบ '1/2' โดยตัดช่องว่างแล้วแบ่งด้วย /
// ============================================

function parseAnswer(inputStr) {
    var cleaned = '';
    for (var i = 0; i < inputStr.length; i++) {
        if (inputStr[i] !== ' ') {
            cleaned = cleaned + inputStr[i];
        }
    }

    var hasSlash = false;
    for (var j = 0; j < cleaned.length; j++) {
        if (cleaned[j] === '/') {
            hasSlash = true;
        }
    }

    if (hasSlash) {
        var parts = cleaned.split('/');
        if (parts.length === 2) {
            var numerator = parseFloat(parts[0]);
            var denominator = parseFloat(parts[1]);
            if (isNaN(numerator) || isNaN(denominator)) {
                return NaN;
            }
            if (denominator === 0) {
                return NaN;
            }
            var fractionValue = numerator / denominator;
            return fractionValue;
        } else {
            return NaN;
        }
    } else {
        var numValue = parseFloat(cleaned);
        return numValue;
    }
}

// ============================================
// ฟังก์ชันแสดงผล
// ============================================

function showPanel(panelName) {
    currentPanel = panelName;

    var panels = document.querySelectorAll('.panel');
    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.remove('active');
    }

    var target = document.getElementById('panel-' + panelName);
    if (target) {
        target.classList.add('active');
    }

    var navBtns = document.querySelectorAll('.nav-btn');
    for (var j = 0; j < navBtns.length; j++) {
        navBtns[j].classList.remove('active');
    }
    var activeNav = document.getElementById('nav-' + panelName);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    if (panelName === 'home') {
        updateHomeStats();
    }
    if (panelName === 'analytics') {
        updateAnalyticsDashboard();
    }
}

function updateHomeStats() {
    var stats = getOverallStats();
    document.getElementById('home-stats-total').textContent = stats.total;
    document.getElementById('home-stats-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('home-stats-streak').textContent = stats.bestStreak;

    var topBlinds = getTopBlindspots(5);
    var blindList = document.getElementById('home-blindspot-list');
    if (topBlinds.length === 0) {
        blindList.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูล เริ่มทำแบบฝึกหัดเพื่อให้ระบบวิเคราะห์จุดบอดของคุณ</p>';
    } else {
        var html = '';
        var maxCount = topBlinds[0].count;
        for (var i = 0; i < topBlinds.length; i++) {
            var tagName = BLINDSPOT_TAG_NAMES[topBlinds[i].tag];
            if (tagName === undefined) { tagName = topBlinds[i].tag; }
            var barWidth = Math.round((topBlinds[i].count / maxCount) * 100);
            html = html + '<div class="blindspot-item">';
            html = html + '<span class="blindspot-tag">' + tagName + '</span>';
            html = html + '<div class="blindspot-bar-bg"><div class="blindspot-bar-fill" style="width:' + barWidth + '%"></div></div>';
            html = html + '<span class="blindspot-count">' + topBlinds[i].count + '</span>';
            html = html + '</div>';
        }
        blindList.innerHTML = html;
    }
}

function populateLevels() {
    var select = document.getElementById('select-level');
    select.innerHTML = '<option value="">-- เลือกระดับ --</option>';
    var keys = Object.keys(CURRICULUM);
    for (var i = 0; i < keys.length; i++) {
        var opt = document.createElement('option');
        opt.value = keys[i];
        opt.textContent = CURRICULUM[keys[i]].name;
        select.appendChild(opt);
    }
}

function onLevelChange() {
    var level = document.getElementById('select-level').value;
    var termSelect = document.getElementById('select-term');
    var chapterSelect = document.getElementById('select-chapter');
    var startBtn = document.getElementById('btn-start-quiz');

    termSelect.innerHTML = '<option value="">-- เลือกภาคเรียน --</option>';
    chapterSelect.innerHTML = '<option value="">-- เลือกบทเรียน --</option>';
    chapterSelect.disabled = true;
    startBtn.disabled = true;

    if (level === '' || CURRICULUM[level] === undefined) {
        termSelect.disabled = true;
        return;
    }

    termSelect.disabled = false;
    var terms = Object.keys(CURRICULUM[level].terms);
    for (var i = 0; i < terms.length; i++) {
        var opt = document.createElement('option');
        opt.value = terms[i];
        opt.textContent = terms[i];
        termSelect.appendChild(opt);
    }
}

function onTermChange() {
    var level = document.getElementById('select-level').value;
    var term = document.getElementById('select-term').value;
    var chapterSelect = document.getElementById('select-chapter');
    var startBtn = document.getElementById('btn-start-quiz');

    chapterSelect.innerHTML = '<option value="">-- เลือกบทเรียน --</option>';
    startBtn.disabled = true;

    if (level === '' || term === '' || CURRICULUM[level] === undefined) {
        chapterSelect.disabled = true;
        return;
    }

    var termData = CURRICULUM[level].terms[term];
    if (termData === undefined) {
        chapterSelect.disabled = true;
        return;
    }

    chapterSelect.disabled = false;
    var chapters = termData.chapters;
    for (var i = 0; i < chapters.length; i++) {
        var opt = document.createElement('option');
        opt.value = chapters[i].key;
        opt.textContent = chapters[i].name;
        chapterSelect.appendChild(opt);
    }
}

function onChapterChange() {
    var chapter = document.getElementById('select-chapter').value;
    var startBtn = document.getElementById('btn-start-quiz');

    // ถ้าเลือกบทที่ล็อคไว้ ปุ่มจะยังคง disabled
    if (chapter === '' || chapter === 'locked_chapter') {
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
}

function findChapterName(key) {
    var levels = Object.keys(CURRICULUM);
    for (var i = 0; i < levels.length; i++) {
        var terms = Object.keys(CURRICULUM[levels[i]].terms);
        for (var j = 0; j < terms.length; j++) {
            var chapters = CURRICULUM[levels[i]].terms[terms[j]].chapters;
            for (var k = 0; k < chapters.length; k++) {
                if (chapters[k].key === key) {
                    return chapters[k].name;
                }
            }
        }
    }
    return key;
}

// ============================================
// ฟังก์ชันทำแบบฝึกหัด
// ============================================

function startQuiz() {
    var chapterKey = document.getElementById('select-chapter').value;
    if (chapterKey === '' || chapterKey === 'locked_chapter') {
        alert('กรุณาเลือกบทเรียนที่ปลดล็อคแล้ว');
        return;
    }
    if (QUESTION_GENERATORS[chapterKey] === undefined) {
        alert('ยังไม่มีโจทย์สำหรับบทนี้');
        return;
    }

    currentChapterKey = chapterKey;
    quizCorrect = 0;
    quizTotal = 0;
    currentStreak = 0;
    hasAnswered = false;

    var chapterName = findChapterName(chapterKey);
    document.getElementById('quiz-chapter-name').textContent = chapterName;

    showPanel('quiz');
    generateNewQuestion();
}

function generateNewQuestion() {
    hasAnswered = false;
    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('solution-container').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('input-answer').value = '';
    document.getElementById('input-answer').disabled = false;
    document.getElementById('input-answer').className = 'answer-input';
    document.getElementById('btn-submit').disabled = false;

    var feedbackEl = document.getElementById('feedback-container');
    feedbackEl.className = 'feedback-panel';

    document.getElementById('solution-steps').style.display = 'none';
    document.getElementById('btn-show-solution').textContent = 'แสดงวิธีทำ';

    var generator = QUESTION_GENERATORS[currentChapterKey];
    if (generator === undefined) {
        document.getElementById('question-text').textContent = 'ไม่พบคำถามสำหรับบทนี้';
        return;
    }
    currentQuestion = generator();

    document.getElementById('question-text').textContent = currentQuestion.questionText;

    if (currentQuestion.visualType) {
        document.getElementById('visual-container').style.display = 'flex';
        renderVisual(currentQuestion.visualType, currentQuestion.visualData);
    } else {
        document.getElementById('visual-container').style.display = 'none';
    }

    updateScoreDisplay();
    document.getElementById('input-answer').focus();
}

function submitAnswer() {
    if (hasAnswered) {
        return;
    }

    var inputEl = document.getElementById('input-answer');
    var rawInput = inputEl.value;

    var userAnswer = parseAnswer(rawInput);

    if (isNaN(userAnswer)) {
        alert('กรุณาพิมพ์ตัวเลข เช่น 5 หรือ 1/2');
        return;
    }

    hasAnswered = true;
    quizTotal = quizTotal + 1;
    inputEl.disabled = true;
    document.getElementById('btn-submit').disabled = true;

    var correctAns = currentQuestion.correctAnswer;
    var tolerance = currentQuestion.tolerance;
    var diff = Math.abs(userAnswer - correctAns);

    if (diff <= tolerance) {
        handleCorrectAnswer();
    } else {
        var matchedTrap = null;
        var trapList = currentQuestion.traps;
        for (var i = 0; i < trapList.length; i++) {
            var trapDiff = Math.abs(userAnswer - trapList[i].answer);
            if (trapDiff <= tolerance) {
                matchedTrap = trapList[i];
                break;
            }
        }

        if (matchedTrap !== null) {
            handleBlindspotAnswer(matchedTrap);
        } else {
            handleWrongAnswer();
        }
    }

    updateScoreDisplay();
    document.getElementById('solution-container').style.display = 'block';
    document.getElementById('btn-next').style.display = 'block';
    buildSolutionSteps();
}

function handleCorrectAnswer() {
    quizCorrect = quizCorrect + 1;
    currentStreak = currentStreak + 1;

    document.getElementById('input-answer').className = 'answer-input correct';

    var feedbackEl = document.getElementById('feedback-container');
    feedbackEl.style.display = 'block';
    feedbackEl.className = 'feedback-panel feedback-correct';

    document.getElementById('feedback-icon').textContent = 'OK';
    document.getElementById('feedback-title').textContent = 'ถูกต้อง!';
    document.getElementById('feedback-text').textContent = 'คำตอบของคุณถูกต้อง (' + currentQuestion.correctAnswer + ')';
    document.getElementById('feedback-detail').textContent = '';

    recordAnswer(currentChapterKey, true, null);
}

function handleBlindspotAnswer(trap) {
    currentStreak = 0;

    document.getElementById('input-answer').className = 'answer-input blindspot';

    var feedbackEl = document.getElementById('feedback-container');
    feedbackEl.style.display = 'block';
    feedbackEl.className = 'feedback-panel feedback-blindspot';

    var tagName = BLINDSPOT_TAG_NAMES[trap.tag];
    if (tagName === undefined) { tagName = trap.tag; }

    document.getElementById('feedback-icon').textContent = '!!';
    document.getElementById('feedback-title').textContent = 'พบจุดบอด: ' + tagName;
    document.getElementById('feedback-text').textContent = trap.feedback;
    document.getElementById('feedback-detail').textContent = 'คำตอบที่ถูกต้อง: ' + currentQuestion.correctAnswer;

    recordAnswer(currentChapterKey, false, trap.tag);
}

function handleWrongAnswer() {
    currentStreak = 0;

    document.getElementById('input-answer').className = 'answer-input incorrect';

    var feedbackEl = document.getElementById('feedback-container');
    feedbackEl.style.display = 'block';
    feedbackEl.className = 'feedback-panel feedback-wrong';

    document.getElementById('feedback-icon').textContent = 'X';
    document.getElementById('feedback-title').textContent = 'ไม่ถูกต้อง';
    document.getElementById('feedback-text').textContent = 'คำตอบที่ถูกต้อง: ' + currentQuestion.correctAnswer;
    document.getElementById('feedback-detail').textContent = 'ลองดูวิธีทำด้านล่าง';

    recordAnswer(currentChapterKey, false, null);
}

function buildSolutionSteps() {
    var stepsEl = document.getElementById('solution-steps');
    var steps = currentQuestion.steps;
    var html = '';
    for (var i = 0; i < steps.length; i++) {
        html = html + '<div class="step-item">';
        html = html + '<div class="step-number">' + (i + 1) + '</div>';
        html = html + '<div class="step-text">' + steps[i] + '</div>';
        html = html + '</div>';
    }
    stepsEl.innerHTML = html;
}

function toggleSolution() {
    var stepsEl = document.getElementById('solution-steps');
    var btn = document.getElementById('btn-show-solution');
    if (stepsEl.style.display === 'none') {
        stepsEl.style.display = 'block';
        btn.textContent = 'ซ่อนวิธีทำ';
    } else {
        stepsEl.style.display = 'none';
        btn.textContent = 'แสดงวิธีทำ';
    }
}

function nextQuestion() {
    generateNewQuestion();
    window.scrollTo(0, 0);
}

function updateScoreDisplay() {
    document.getElementById('quiz-score-correct').textContent = quizCorrect;
    document.getElementById('quiz-score-total').textContent = quizTotal;
    document.getElementById('quiz-streak').textContent = currentStreak;
}

// ============================================
// ฝึกจุดบอด (ปุ่มฝึกจุดบอด)
// ฟังก์ชันง่ายๆ หาจุดบอดที่มากที่สุดแล้วแจ้ง
// ============================================

function practiceWeakness() {
    var data = loadData();
    var tags = Object.keys(data.blindspotCounts);

    // ถ้ายังไม่มีข้อมูลจุดบอด
    if (tags.length === 0) {
        alert('ยังไม่พบข้อมูลจุดบอด กรุณาทำแบบฝึกหัดก่อนเพื่อให้ระบบเก็บข้อมูล');
        return;
    }

    // หาจุดบอดที่มีจำนวนมากที่สุด (วนลูปแบบง่าย)
    var topTag = tags[0];
    var topCount = data.blindspotCounts[tags[0]];
    for (var i = 1; i < tags.length; i++) {
        if (data.blindspotCounts[tags[i]] > topCount) {
            topTag = tags[i];
            topCount = data.blindspotCounts[tags[i]];
        }
    }

    // แปลงเป็นชื่อไทย
    var tagNameThai = BLINDSPOT_TAG_NAMES[topTag];
    if (tagNameThai === undefined) {
        tagNameThai = topTag;
    }

    // alert('ระบบตรวจพบจุดบอดของคุณคือ "' + tagNameThai + '" (พบ ' + topCount + ' ครั้ง)\nระบบกำลังดึงโจทย์มาให้ฝึก...\n(ฟีเจอร์นี้ยังอยู่ในช่วงพัฒนา)');
}

// ============================================
// แดชบอร์ดวิเคราะห์
// ============================================

function updateAnalyticsDashboard() {
    var stats = getOverallStats();
    document.getElementById('analytics-total').textContent = stats.total;
    document.getElementById('analytics-correct').textContent = stats.correct;
    document.getElementById('analytics-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('analytics-best-streak').textContent = stats.bestStreak;

    var topBlinds = getTopBlindspots(10);
    var chartEl = document.getElementById('blindspot-chart');
    if (topBlinds.length === 0) {
        chartEl.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูลจุดบอด</p>';
    } else {
        var maxCount = topBlinds[0].count;
        var html = '';
        for (var i = 0; i < topBlinds.length; i++) {
            var tagName = BLINDSPOT_TAG_NAMES[topBlinds[i].tag];
            if (tagName === undefined) { tagName = topBlinds[i].tag; }
            var barClass = BLINDSPOT_BAR_CLASS[topBlinds[i].tag];
            if (barClass === undefined) { barClass = 'bar-sign'; }
            var barWidth = Math.round((topBlinds[i].count / maxCount) * 100);
            html = html + '<div class="chart-bar-row">';
            html = html + '<span class="chart-label">' + tagName + '</span>';
            html = html + '<div class="chart-bar-track">';
            html = html + '<div class="chart-bar-fill ' + barClass + '" style="width:' + barWidth + '%">';
            html = html + '<span class="chart-bar-value">' + topBlinds[i].count + '</span>';
            html = html + '</div></div></div>';
        }
        chartEl.innerHTML = html;
    }

    var data = loadData();
    var chapStatsEl = document.getElementById('chapter-stats-list');
    var chapKeys = Object.keys(data.chapterStats);
    if (chapKeys.length === 0) {
        chapStatsEl.innerHTML = '<p class="empty-state">ยังไม่มีข้อมูล</p>';
    } else {
        var html2 = '';
        for (var j = 0; j < chapKeys.length; j++) {
            var cKey = chapKeys[j];
            var cName = findChapterName(cKey);
            var cData = data.chapterStats[cKey];
            var pct = 0;
            if (cData.attempted > 0) {
                pct = Math.round((cData.correct / cData.attempted) * 100);
            }
            var fillClass = 'bad';
            if (pct >= 70) {
                fillClass = 'good';
            } else if (pct >= 40) {
                fillClass = 'medium';
            }
            html2 = html2 + '<div class="chapter-stat-item">';
            html2 = html2 + '<span class="chapter-stat-name">' + cName + '</span>';
            html2 = html2 + '<div class="chapter-stat-bar">';
            html2 = html2 + '<div class="chapter-stat-fill ' + fillClass + '" style="width:' + pct + '%"></div>';
            html2 = html2 + '</div>';
            html2 = html2 + '<span class="chapter-stat-pct">' + pct + '%</span>';
            html2 = html2 + '</div>';
        }
        chapStatsEl.innerHTML = html2;
    }
}

// ============================================
// ล้างข้อมูล
// ============================================

function clearAllData() {
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function confirmClearData() {
    localStorage.removeItem(STORAGE_KEY);
    closeModal();
    updateHomeStats();
    updateAnalyticsDashboard();
    showPanel('home');
    alert('ล้างข้อมูลเรียบร้อยแล้ว');
}

// ============================================
// เริ่มต้นระบบ
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    populateLevels();

    document.getElementById('select-level').addEventListener('change', onLevelChange);
    document.getElementById('select-term').addEventListener('change', onTermChange);
    document.getElementById('select-chapter').addEventListener('change', onChapterChange);

    updateHomeStats();
});
