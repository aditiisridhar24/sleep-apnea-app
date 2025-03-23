* script.js */
document.addEventListener('DOMContentLoaded', function() {
    // ESS Questions
    const essQuestions = [
        "Sitting and reading",
        "Watching TV",
        "Sitting inactive in a public place",
        "As a passenger in a car for an hour without a break",
        "Lying down to rest in the afternoon",
        "Sitting and talking to someone",
        "Sitting quietly after a lunch without alcohol",
        "In a car, while stopped for a few minutes in traffic"
    ];

    // STOP-BANG Questions
    const stopQuestions = [
        "Do you Snore loudly?",
        "Do you often feel Tired during the day?",
        "Has anyone Observed you stop breathing during sleep?",
        "Do you have or are being treated for high blood Pressure?"
    ];

    const bangQuestions = [
        "BMI more than 35 kg/m²?",
        "Age over 50?",
        "Neck circumference > 40cm?",
        "Gender = Male?"
    ];

    // Initialize ESS Questions
    const essContainer = document.querySelector('.ess-questions');
    essQuestions.forEach((question, index) => {
        const questionCard = createQuestionCard(question, index, 'ess');
        essContainer.appendChild(questionCard);
    });

    // Initialize STOP Questions
    const stopContainer = document.querySelector('.stop-questions');
    stopQuestions.forEach((question, index) => {
        const questionCard = createQuestionCard(question, index, 'stop');
        stopContainer.appendChild(questionCard);
    });

    // Initialize BANG Questions
    const bangContainer = document.querySelector('.bang-questions');
    bangQuestions.forEach((question, index) => {
        const questionCard = createQuestionCard(question, index, 'bang');
        bangContainer.appendChild(questionCard);
    });

    // Calculate Risk Button Event
    document.getElementById('calculate-risk').addEventListener('click', calculateRisk);
    
    // Download Results Button Event
    document.getElementById('download-results').addEventListener('click', downloadResults);
});

function createQuestionCard(question, index, type) {
    const card = document.createElement('div');
    card.className = 'question-card';
    
    const questionText = document.createElement('p');
    questionText.textContent = question;
    
    const radioGroup = document.createElement('div');
    radioGroup.className = 'radio-group';
    
    if (type === 'ess') {
        // ESS options (0-3)
        for (let i = 0; i < 4; i++) {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `ess-${index}`;
            radio.value = i;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(i));
            radioGroup.appendChild(label);
        }
    } else {
        // STOP-BANG options (Yes/No)
        ['Yes', 'No'].forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `${type}-${index}`;
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            radioGroup.appendChild(label);
        });
    }
    
    card.appendChild(questionText);
    card.appendChild(radioGroup);
    return card;
}

function calculateRisk() {
    // Calculate ESS Score
    let essScore = 0;
    document.querySelectorAll('[name^="ess-"]').forEach(radio => {
        if (radio.checked) {
            essScore += parseInt(radio.value);
        }
    });
    
    // Calculate STOP-BANG Score
    let stopBangScore = 0;
    document.querySelectorAll('[name^="stop-"], [name^="bang-"]').forEach(radio => {
        if (radio.checked && radio.value === 'Yes') {
            stopBangScore++;
        }
    });
    
    // Display Results
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    
    // ESS Result
    const essResult = document.getElementById('ess-result');
    essResult.style.backgroundColor = essScore > 10 ? '#e74c3c' : '#2ecc71';
    essResult.innerHTML = `
        <h3>ESS Score: ${essScore}</h3>
        <p>${getEssInterpretation(essScore)}</p>
    `;
    
    // STOP-BANG Result
    const stopBangResult = document.getElementById('stopbang-result');
    stopBangResult.style.backgroundColor = getStopBangColor(stopBangScore);
    stopBangResult.innerHTML = `
        <h3>STOP-BANG Score: ${stopBangScore}</h3>
        <p>${getStopBangInterpretation(stopBangScore)}</p>
    `;
    
    // Recommendations
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = getRecommendations(essScore, stopBangScore);
}

function getEssInterpretation(score) {
    if (score <= 10) return "Normal daytime sleepiness";
    return "Excessive daytime sleepiness";
}

function getStopBangInterpretation(score) {
    if (score < 3) return "Low risk of OSA";
    if (score < 5) return "Intermediate risk of OSA";
    return "High risk of OSA";
}

function getStopBangColor(score) {
    if (score < 3) return "#2ecc71";
    if (score < 5) return "#f1c40f";
    return "#e74c3c";
}

function getRecommendations(essScore, stopBangScore) {
    if (stopBangScore >= 3 || essScore > 10) {
        return `
            <h3>Recommendations</h3>
            <ul>
                <li>Consult a sleep specialist</li>
                <li>Consider a sleep study</li>
                <li>Discuss your symptoms with your primary care physician</li>
            </ul>
        `;
    }
    return `
        <h3>Recommendations</h3>
        <ul>
            <li>Maintain good sleep hygiene</li>
            <li>Regular exercise</li>
            <li>Maintain a healthy weight</li>
        </ul>
    `;
}

function downloadResults() {
    const essScore = calculateEssScore();
    const stopBangScore = calculateStopBangScore();
    
    const results = {
        date: new Date().toISOString(),
        ess: {
            score: essScore,
            interpretation: getEssInterpretation(essScore)
        },
        stopBang: {
            score: stopBangScore,
            interpretation: getStopBangInterpretation(stopBangScore)
        }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sleep_apnea_assessment.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function calculateEssScore() {
    let score = 0;
    document.querySelectorAll('[name^="ess-"]').forEach(radio => {
        if (radio.checked) {
            score += parseInt(radio.value);
        }
    });
    return score;
}

function calculateStopBangScore() {
    let score = 0;
    document.querySelectorAll('[name^="stop-"], [name^="bang-"]').forEach(radio => {
        if (radio.checked && radio.value === 'Yes') {
            score++;
        }
    });
    return score;
}
