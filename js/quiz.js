// F&I Knowledge Quiz - Rotates 3 random questions from pool of 10

const quizQuestions = [
    {
        question: "How do you identify a real objection versus a stall?",
        answer: "Repeat their concern back and ask if they'd move forward if that issue were resolved",
        category: "Sales"
    },
    {
        question: "What's the most effective way to transition from payment to menu presentation?",
        answer: "Connect protection to their family and show how it fits the budget they've already approved",
        category: "F&I"
    },
    {
        question: "How should you handle a customer who says 'I never buy extended warranties'?",
        answer: "Acknowledge their experience and ask what would make them feel differently about this vehicle's protection",
        category: "Objection Handling"
    },
    {
        question: "What's required under TILA before presenting finance terms?",
        answer: "Provide clear disclosure of APR, payment terms, total cost, and finance charges before the customer signs",
        category: "Compliance"
    },
    {
        question: "How do you convert a cash buyer without being pushy?",
        answer: "Focus on their goals, show the value of keeping their cash liquid, and let them see the benefits themselves",
        category: "F&I"
    },
    {
        question: "What's the best way to uncover a customer's true motivation?",
        answer: "Ask open-ended questions about their family, lifestyle, and what this vehicle means to them",
        category: "Consulting"
    },
    {
        question: "Under UDAP, what practice is specifically prohibited?",
        answer: "Any deceptive, unfair, or abusive act - including misleading statements about products or financing terms",
        category: "Compliance"
    },
    {
        question: "How do you present a menu without overwhelming the customer?",
        answer: "Start with their biggest concern, show how protection addresses it, then layer additional value naturally",
        category: "F&I"
    },
    {
        question: "What's the key to building trust quickly with a new customer?",
        answer: "Listen more than you talk, validate their concerns, and demonstrate you understand their unique situation",
        category: "Sales"
    },
    {
        question: "How do you handle a customer who's been 'burned' before by F&I?",
        answer: "Empathize with their experience, acknowledge the industry's past issues, and show how you're different through transparency",
        category: "Consulting"
    }
];

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    // Get 3 random questions
    const shuffled = shuffleArray(quizQuestions);
    const selectedQuestions = shuffled.slice(0, 3);

    // Build quiz HTML
    let quizHTML = '';
    selectedQuestions.forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question" style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: ${index < 2 ? '1px solid #e5e7eb' : 'none'};">
                <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem;">
                    <span style="background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${index + 1}</span>
                    <div style="flex: 1;">
                        <span style="display: inline-block; background: #eff6ff; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem;">${q.category}</span>
                        <h5 style="font-size: 1.1rem; color: var(--text-dark); margin: 0.5rem 0; font-weight: 600; line-height: 1.5;">${q.question}</h5>
                    </div>
                </div>
                <div class="quiz-answer" id="answer-${index}" style="display: none; margin-left: 3rem; background: #f0fdf4; border-left: 4px solid #10b981; padding: 1rem; border-radius: 8px;">
                    <p style="margin: 0; color: #166534; font-weight: 500; line-height: 1.6;">${q.answer}</p>
                </div>
                <button onclick="toggleAnswer(${index})" id="btn-${index}" style="margin-left: 3rem; margin-top: 1rem; background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    Show Answer
                </button>
            </div>
        `;
    });

    container.innerHTML = quizHTML;
}

function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const button = document.getElementById(`btn-${index}`);

    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        button.textContent = 'Hide Answer';
        button.style.background = '#10b981';
    } else {
        answer.style.display = 'none';
        button.textContent = 'Show Answer';
        button.style.background = 'linear-gradient(135deg, #1e40af, #7c3aed)';
    }
}

// Load quiz when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadQuiz);
} else {
    loadQuiz();
}
