const questions = [
    {
        text: "____ you have experience working with remote teams?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se utiliza con el pronombre 'you' en preguntas de presente simple."
    },
    {
        text: "____ this role require advanced English skills?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Does"],
        explanation: "'Does' se usa con sujetos en tercera persona singular, como 'this role'."
    },
    {
        text: "____ we need to interview more candidates for this position?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se utiliza con el pronombre 'we' para preguntar en presente simple."
    },
    {
        text: "____ you feel comfortable working under pressure?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se usa con 'you' en preguntas de presente simple."
    },
    {
        text: "____ the candidate have the necessary certifications?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Does"],
        explanation: "'Does' se utiliza con 'the candidate' (tercera persona singular)."
    },
    {
        text: "____ you prefer working with a permanent or temporary contract?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se usa con 'you' en preguntas de presente simple."
    },
    {
        text: "____ your team members collaborate well with others?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se utiliza con 'your team members' (plural) para preguntar en presente simple."
    },
    {
        text: "____ we need to provide visa sponsorship for the candidate?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se usa con 'we' para preguntas en presente simple."
    },
    {
        text: "____ the company offer training programs for new hires?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Does"],
        explanation: "'Does' se usa con 'the company' (tercera persona singular)."
    },
    {
        text: "____ you think the candidate is a good fit for this role?",
        options: ["Do", "Does", "Is", "Are"],
        correct: ["Do"],
        explanation: "'Do' se utiliza con 'you' para hacer preguntas en presente simple."
    }
];


const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const resultsDiv = document.getElementById('results');
const retryButton = document.getElementById('retry-button');

function loadQuiz() {
    let quizHtml = '';
    questions.forEach((q, index) => {
        quizHtml += `
        <div class="question">
            <p>${index + 1}. ${q.text}</p>
            <ul class="options">
                ${q.options.map((option, i) => `
                    <li>
                        <input type="radio" name="q${index}" value="${option}" id="q${index}o${i}">
                        <label for="q${index}o${i}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        </div>
        `;
    });
    quizContainer.innerHTML = quizHtml;
}

function calculateResults() {
    let score = 0;
    let resultsHtml = '';
    let allAnswered = true; // Variable para verificar si todas las preguntas están respondidas

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const selectedValue = selectedOption ? selectedOption.value : null;
        const correct = q.correct;

        if (!selectedValue) {
            allAnswered = false; // Si alguna pregunta no está respondida, cambia a false
        }

        resultsHtml += `<p>Pregunta ${index + 1}: `;
        if (selectedValue) {
            resultsHtml += `${q.text} Seleccionaste <strong>${selectedValue}</strong>. `;
        } else {
            resultsHtml += `No seleccionaste ninguna opción. `;
        }

        if (correct.includes(selectedValue)) {
            score++;
            resultsHtml += `Correcta (${correct.join(', ')})</p>`;
        } else {
            resultsHtml += `Incorrecta. La(s) respuesta(s) correcta(s) es/son ${correct.join(', ')}. `;
            resultsHtml += `<em>Explicación: ${q.explanation}</em></p>`;
        }
    });

    if (!allAnswered) {
        alert("Por favor, responde todas las preguntas antes de enviar.");
        return; // Si hay preguntas sin responder, no continuamos
    }

    resultsHtml += `<p><strong>Puntuación: ${score} / ${questions.length}</strong></p>`;
    resultsDiv.innerHTML = resultsHtml;
}

submitButton.addEventListener('click', () => {
    calculateResults();
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
});

retryButton.addEventListener('click', () => {
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuiz();
});

loadQuiz();
