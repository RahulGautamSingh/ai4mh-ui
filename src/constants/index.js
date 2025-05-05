const PHQ9_OPTIONS = [
    "Not at all",
    "Several Days",
    "More than half the days",
    "Nearly Everyday",
];

export const PHQ9_QUESTIONS = [{
        question: "Little interest or pleasure in doing things",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Feeling down, depressed, or hopeless",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Trouble falling or staying asleep, or sleeping too much",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Feeling tired or having little energy",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Poor appetite or overeating",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Feeling bad about yourself   or that you are a failure or have let yourself or your family down",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Trouble concentrating on things, such as reading the newspaper or watching television",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Moving or speaking so slowly that other people could have noticed. Or the opposite    being so figety or restless that you have been moving around a lot more than usual",
        options: PHQ9_OPTIONS,
    },
    {
        question: "Thoughts that you would be better off dead, or of hurting yourself",
        options: PHQ9_OPTIONS,
    }
];

export const MADRS_QUESTIONS = [{
        question: "Apparent Sadness",
        description: "Representing despondency, gloom and despair, (more than just ordinary transient low spirits) reflected in speech, facial expression, and posture.",
        italic: "Rate by depth and inability to brighten up.",
        options: [
            "No sadness.",
            "Looks dispirited but does brighten up without difficulty.",
            "Appears sad and unhappy most of the time.",
            "Looks miserable all the time. Extremely despondent.",
        ],
    },
    {
        question: "Reported sadness",
        description: "Representing reports of depressed mood, regardless of whether it is reflected in appearance or not. Includes low spirits, despondency or the feeling of being beyond help and without hope.",
        italic: "Rate according to intensity, duration and the extent to which the mood is reported to be influenced by events.",
        options: [
            "Occasional sadness in keeping with the circumstances.",
            "Sad or low but brightens up without difficulty.",
            "Pervasive feelings of sadness or gloominess. The mood is still influenced by external circumstances.",
            "Continuous or unvarying sadness, misery or despondency.",
        ],
    },
    {
        question: "Inner tension",
        description: "Representing feelings of ill-defined discomfort, edginess, inner turmoil, mental tension mounting to either panic, dread or anguish.",
        italic: "Rate according to intensity, frequency, duration and the extent of reassurance called for.",
        options: [
            "Placid. Only fleeting inner tension.",
            "Occasional feelings of edginess and ill defined discomfort.",
            "Continuous feelings of inner tension or intermittent panic which the patient can only master with some difficulty.",
            "Unrelenting dread or anguish. Overwhelming panic",
        ],
    },
    {
        question: "Reduced sleep",
        description: "Representing the experience of reduced duration or depth of sleep compared to the subject's own normal pattern when well.",
        options: [
            "Sleeps as usual.",
            "Slight difficulty dropping off to sleep or slightly reduced, light or fitful sleep.",
            "Sleep reduced or broken by at least two hours.",
            "Less than two or three hours sleep",
        ],
    },
    {
        question: "Reduced appetite",
        description: "Representing the feeling of a loss of appetite compared with when well.",
        italic: "Rate by loss of desire for food or the need to force oneself to eat.",
        options: [
            "Normal or increased appetite.",
            "Slightly reduced appetite.",
            "No appetite. Food is tasteless.",
            "Needs persuasion to eat at all.",
        ],
    },
    {
        question: "Concentration Difficulties",
        description: "Representing difficulties in collecting one's thoughts mounting to incapacitating lack of concentration.",
        italic: "Rate according to intensity, frequency, and degree of incapacity produced.",
        options: [
            "No difficulties in concentrating.",
            "Occasional difficulties in collecting one's thoughts.",
            "Difficulties in concentrating and sustaining thought which reduces ability to read or hold a conversation.",
            "Unable to read or converse without great difficulty.",
        ],
    },
    {
        question: "Lassitude",
        description: "Representing a difficulty getting started or slowness initiating and performing everyday activities.",
        options: [
            "Hardly any difficulty in getting started. No sluggishness.",
            "Difficulties in starting activities.",
            "Difficulties in starting simple routine activities which are carried out with effort.",
            "Complete lassitude. Unable to do anything without help.",
        ],
    },
    {
        question: "Inability to feel",
        description: "Representing the subjective experience of reduced interest in the surroundings, or activities that normally give pleasure. The ability to react with adequate emotion to circumstances or people is reduced.",
        options: [
            "Normal interest in the surroundings and in other people.",
            "Reduced ability to enjoy usual interests.",
            "Loss of interest in the surroundings. Loss of feelings or friends and acquaintances.",
            "The experience of being emotionally paralysed, inability to feel anger, grief or pleasure and a complete or even painful failure to feel for close relatives and friends.",
        ],
    },
    {
        question: "Pessimistic thoughts",
        description: "Representing thoughts of guilt, inferiority, self-reproach, sinfulness, remorse and ruin.",
        options: [
            "No pessimistic thoughts.",
            "Fluctuating ideas of failure, self-reproach or self depreciation.",
            "Persistent self-accusations, or definite but still rational ideas of guilt or sin. Increasingly pessimistic about the future.",
            "Delusions of ruin, remorse or unredeemable sin. Self-accusations which are absurd and unshakable.",
        ],
    },
    {
        question: "Suicidal thoughts",
        description: "Representing the feeling that life is not worth living, that a natural death would be welcome, suicidal thoughts, and preparations for suicide.",
        italic: "Suicidal attempts should not in themselves influence the rating.",
        options: [
            "Enjoys life or takes it as it comes.",
            "Weary of life. Only fleeting suicidal thoughts.",
            "Probably better off dead. Suicidal thoughts are common, and suicide is considered as a possible solution, but without specific plans or intention.",
            "Explicit plans for suicide when there is an opportunity. Active preparation for suicide.",
        ],
    },
];