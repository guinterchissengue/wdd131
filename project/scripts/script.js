// Total number of questions in the quiz. 
const totalQuestions = 10;
 
// // localStorage key.
const STORAGE_KEY = 'quizAnswers';
 
// Results for each career category.
const recommendations = {
  tech: {
    title: `Computer Science or Software Engineering`,
    description: `You enjoy logic, problem-solving, and technology. A course in Computer Science or Software Engineering could help you build apps, websites, systems, and digital solutions.`,
    courses: [`Computer Science`, `Software Engineering`, `Information Technology`]
  },
  business: {
    title: `Business Administration or Marketing`,
    description: `You seem interested in leadership, planning, and opportunities. A business-related course could help you develop management, finance, marketing, and entrepreneurship skills.`,
    courses: [`Business Administration`, `Marketing`, `Finance`]
  },
  health: {
    title: `Medicine, Nursing, or Public Health`,
    description: `Your answers show that you care about people and practical service. A health-related course could prepare you to support communities and improve people's quality of life.`,
    courses: [`Nursing`, `Medicine`, `Public Health`]
  },
  creative: {
    title: `Design, Communication, or Arts`,
    description: `You appear to enjoy imagination, expression, and creative work. A creative course could help you communicate ideas through design, media, writing, or visual projects.`,
    courses: [`Graphic Design`, `Communication`, `Digital Media`]
  }
};
 
// Category keys for score comparison.
const categoryNames = [`tech`, `business`, `health`, `creative`];
 
// Get selected values as an array.
function getSelectedAnswers() {
  const selectedInputs = document.querySelectorAll(`input[type="radio"]:checked`);
  return Array.from(selectedInputs).map((input) => input.value);
}
 
// Store answers in localStorage.
function saveAnswers(answers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}
 
// Get saved answers or null.
function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    // Treat invalid data as no saved quiz.
    return null;
  }
}
 
// Calculate category scores from selections.
function countAnswers(answers) {
  const startingScore = {
    tech: 0,
    business: 0,
    health: 0,
    creative: 0
  };
 
  return answers.reduce((score, answer) => {
    // Only count values we recognize, ignoring anything unexpected.
    if (answer in score) {
      score[answer] += 1;
    }
    return score;
  }, startingScore);
}
 
// Select highest scoring category.
function findTopCategory(score) {
  return categoryNames.reduce((topCategory, currentCategory) => {
    return score[currentCategory] > score[topCategory] ? currentCategory : topCategory;
  });
}
 
// Create course list items.
function buildCourseList(courses) {
  return courses.map((course) => `<li>${course}</li>`).join(``);
}
 
// Render the saved result inside #resultBox (results page only).
function displayResult() {
  const resultBox = document.querySelector(`#resultBox`);
  if (!resultBox) {
    return;
  }
 
  const savedAnswers = loadAnswers();
 
  if (!savedAnswers || savedAnswers.length < totalQuestions) {
    resultBox.innerHTML = `
      <h2>No Quiz Result Found</h2>
      <p>Please complete the quiz first so PathFinder can recommend a career direction.</p>
    `;
    return;
  }
 
  const score = countAnswers(savedAnswers);
  const topCategory = findTopCategory(score);
  const result = recommendations[topCategory];
 
  // Insert the recommended path using template literals.
  resultBox.innerHTML = `
    <h2>Your Recommended Career Path</h2>
    <h3>${result.title}</h3>
    <p>${result.description}</p>
    <h3>Related University Courses</h3>
    <ul class="result-list">
      ${buildCourseList(result.courses)}
    </ul>
  `;
}
 
// Handle the quiz form submission.
function handleQuizSubmit(event) {
  event.preventDefault();
 
  const answers = getSelectedAnswers();
  const formMessage = document.querySelector(`#formMessage`);
 
  // Display inline warning for missing answers.
  if (answers.length < totalQuestions) {
    if (formMessage) {
      formMessage.textContent = `Please answer all ${totalQuestions} questions before seeing your result.`;
    }
    return;
  }
 // Clear message, save answers, and go to results page.
  if (formMessage) {
    formMessage.textContent = ``;
  }
  saveAnswers(answers);
  window.location.href = `results.html`;
}
 
// Remove the saved result and refresh what is shown on screen.
function clearSavedResult() {
  localStorage.removeItem(STORAGE_KEY);
  displayResult();
}
 
// Wire up event listeners once the DOM is fully loaded.
document.addEventListener(`DOMContentLoaded`, () => {
  const quizForm = document.querySelector(`#quizForm`);
  const clearButton = document.querySelector(`#clearResult`);
 
  if (quizForm) {
    quizForm.addEventListener(`submit`, handleQuizSubmit);
  }
 
  if (clearButton) {
    clearButton.addEventListener(`click`, clearSavedResult);
  }
 
  // Try to display a result on page load (only acts on the results page).
  displayResult();
});
 
