export const MBTI_QUESTIONS = [
    // Extroversion (E) vs Introversion (I)
    { id: 1, text: "I feel energized after spending time with a large group of people.", dimension: "EI" },
    { id: 2, text: "I prefer to think before I speak.", dimension: "EI" },
    { id: 3, text: "I enjoy being the center of attention.", dimension: "EI" },
    { id: 4, text: "I need time alone to recharge after social interactions.", dimension: "EI" },
    { id: 5, text: "I tend to start conversations with strangers.", dimension: "EI" },
    { id: 6, text: "I prefer deep, one-on-one conversations over small talk.", dimension: "EI" },
    { id: 7, text: "I express my feelings openly and easily.", dimension: "EI" },
    { id: 8, text: "I keep my thoughts to myself until they are fully formed.", dimension: "EI" },
    { id: 9, text: "I am often described as enthusiastic and outgoing.", dimension: "EI" },
    { id: 10, text: "I am often described as calm and reserved.", dimension: "EI" },
    { id: 11, text: "I think out loud.", dimension: "EI" },
    { id: 12, text: "I process things internally.", dimension: "EI" },
    { id: 13, text: "I prefer a fast-paced environment.", dimension: "EI" },
    { id: 14, text: "I prefer a quiet and peaceful environment.", dimension: "EI" },
    { id: 15, text: "I initiate social activities.", dimension: "EI" },

    // Sensing (S) vs Intuition (N)
    { id: 16, text: "I focus on the present reality rather than future possibilities.", dimension: "SN" },
    { id: 17, text: "I am more interested in abstract ideas and theories.", dimension: "SN" },
    { id: 18, text: "I prefer concrete facts and details.", dimension: "SN" },
    { id: 19, text: "I trust my gut instincts and patterns.", dimension: "SN" },
    { id: 20, text: "I like instructions that are clear and step-by-step.", dimension: "SN" },
    { id: 21, text: "I like to figure things out as I go.", dimension: "SN" },
    { id: 22, text: "I remember events exactly as they happened.", dimension: "SN" },
    { id: 23, text: "I remember the meaning and impression of events.", dimension: "SN" },
    { id: 24, text: "I am practical and realistic.", dimension: "SN" },
    { id: 25, text: "I am imaginative and innovative.", dimension: "SN" },
    { id: 26, text: "I pay attention to what is actual.", dimension: "SN" },
    { id: 27, text: "I pay attention to what is possible.", dimension: "SN" },
    { id: 28, text: "I describe things in a literal way.", dimension: "SN" },
    { id: 29, text: "I describe things in a figurative way.", dimension: "SN" },
    { id: 30, text: "I value common sense.", dimension: "SN" },

    // Thinking (T) vs Feeling (F)
    { id: 31, text: "I make decisions based on logic and objective analysis.", dimension: "TF" },
    { id: 32, text: "I make decisions based on my personal values and how they affect others.", dimension: "TF" },
    { id: 33, text: "I prioritize truth over tact.", dimension: "TF" },
    { id: 34, text: "I prioritize harmony and avoiding conflict.", dimension: "TF" },
    { id: 35, text: "I am convinced by rational arguments.", dimension: "TF" },
    { id: 36, text: "I am convinced by emotional appeals.", dimension: "TF" },
    { id: 37, text: "I tend to be critical and skeptical.", dimension: "TF" },
    { id: 38, text: "I tend to be accepting and trusting.", dimension: "TF" },
    { id: 39, text: "I value justice and fairness.", dimension: "TF" },
    { id: 40, text: "I value mercy and compassion.", dimension: "TF" },
    { id: 41, text: "I see things as black and white.", dimension: "TF" },
    { id: 42, text: "I see the nuances and grey areas.", dimension: "TF" },
    { id: 43, text: "I am task-oriented.", dimension: "TF" },
    { id: 44, text: "I am people-oriented.", dimension: "TF" },
    { id: 45, text: "I analyze problems to find the root cause.", dimension: "TF" },

    // Judging (J) vs Perceiving (P)
    { id: 46, text: "I prefer to have a detailed plan before starting a project.", dimension: "JP" },
    { id: 47, text: "I prefer to keep my options open and be spontaneous.", dimension: "JP" },
    { id: 48, text: "I like to finish work before playing.", dimension: "JP" },
    { id: 49, text: "I am easily distracted by new and exciting things.", dimension: "JP" },
    { id: 50, text: "I am organized and orderly.", dimension: "JP" },
    { id: 51, text: "I am flexible and adaptable.", dimension: "JP" },
    { id: 52, text: "I like closure and settled decisions.", dimension: "JP" },
    { id: 53, text: "I like to explore all possibilities before deciding.", dimension: "JP" },
    { id: 54, text: "I work best with deadlines.", dimension: "JP" },
    { id: 55, text: "I work best when inspired.", dimension: "JP" },
    { id: 56, text: "I make to-do lists and stick to them.", dimension: "JP" },
    { id: 57, text: "I handle things as they come up.", dimension: "JP" },
    { id: 58, text: "I appreciate rules and structure.", dimension: "JP" },
    { id: 59, text: "I find rules restrictive.", dimension: "JP" },
    { id: 60, text: "I commit to plans definitively.", dimension: "JP" },
    { id: 61, text: "I prefer tentative plans.", dimension: "JP" }
];

export const APTITUDE_SUB_ATTRIBUTES = {
    logical: [
        "I can easily identify patterns in complex data sets.",
        "I enjoy solving logic puzzles and riddles.",
        "I approach problems step-by-step to find a solution.",
        "I can spot inconsistencies in an argument quickly.",
        "I enjoy games that require strategy (Chess, Sudoku)."
    ],
    verbal: [
        "I can articulate my thoughts clearly and concisely.",
        "I possess a strong vocabulary.",
        "I enjoy reading and analyzing written content.",
        "I can explain complex concepts in simple terms.",
        "I am persuasive in arguments or debates."
    ],
    numerical: [
        "I am comfortable working with numbers and statistics.",
        "I can do mental math quickly.",
        "I enjoy analyzing financial or quantitative data.",
        "I can estimate quantities with reasonable accuracy.",
        "I find charts and graphs easy to interpret."
    ],
    creative: [
        "I often come up with ideas that others haven't thought of.",
        "I enjoy activities that allow for artistic expression.",
        "I can connect seemingly unrelated concepts.",
        "I prefer to innovate rather than follow existing methods.",
        "I enjoy brainstorming sessions."
    ],
    spatial: [
        "I have a good sense of direction and navigation.",
        "I can visualize objects in 3D in my mind.",
        "I am good at packing or arranging items efficiently.",
        "I enjoy design, drawing, or architecture.",
        "I can easily read maps and blueprints."
    ],
    interpersonal: [
        "I can easily sense how others are feeling.",
        "I differ conflicts effectively.",
        "I am a good active listener.",
        "People often come to me for advice.",
        "I enjoy working in teams and collaborating."
    ],
    technical: [
        "I pick up new software or tools quickly.",
        "I understand how systems and machines work.",
        "I enjoy troubleshooting technical issues.",
        "I am interested in how things generate and function.",
        "I am comfortable with coding or engineering concepts."
    ],
    organizational: [
        "I keep my workspace and digital files tidy.",
        "I am good at managing my time and meeting deadlines.",
        "I can plan and execute complex events or projects.",
        "I create systems to improve efficiency.",
        "I rarely lose track of details."
    ],
    entrepreneurial: [
        "I am willing to take calculated risks.",
        "I see opportunities where others see problems.",
        "I am self-motivated and don't need external validation.",
        "I enjoy the challenge of building something from scratch.",
        "I am resilient in the face of failure."
    ]
};
