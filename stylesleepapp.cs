/* styles.css */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --warning-color: #e74c3c;
    --text-color: #2c3e50;
    --background-color: #f8f9fa;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    text-align: center;
    margin-bottom: 3rem;
}

header h1 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.assessment-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
}

h2 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
}

.question-card {
    background: var(--background-color);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.radio-group {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}

.primary-btn, .secondary-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.primary-btn {
    background: var(--primary-color);
    color: white;
    width: 100%;
    margin: 1rem 0;
}

.secondary-btn {
    background: var(--secondary-color);
    color: white;
}

.result-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.result-card {
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    color: white;
}

.hidden {
    display: none;
}