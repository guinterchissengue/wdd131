const totalQuestions = 10;

//  Store the result information for each career category.
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

// Array to compare the scores for each category.
const categoryNames = [`tech`, `business`, `health`, `creative`];

function getSelectedAnswers() {
// Get selected radio buttons as array.
  const selectedInputs = document.querySelectorAll(`input[type="radio"]:checked`);
  return Array.from(selectedInputs).map((input) => input.value);
}

function saveAnswers(answers) {
 // Store answers in localStorage.
  localStorage.setItem(`quizAnswers`, JSON.stringify(answers));
}

function countAnswers(answers) {
  const startingScore = {
    tech: 0,
    business: 0,
    health: 0,
    creative: 0
  };

  // Count category occurrences.
  return answers.reduce((score, answer) => {
    score[answer] += 1;
    return score;
  }, startingScore);
}

function findTopCategory(score) {
  // Find highest scoring category.
  return categoryNames.reduce((topCategory, currentCategory) => {
    return score[currentCategory] > score[topCategory] ? currentCategory : topCategory;
  });
}

function buildCourseList(courses) {
  // Generate results list.
  return courses.map((course) => `<li>${course}</li>`).join(``);
}

function displayResult() {
  const resultBox = document.querySelector(`#resultBox`);
  const savedAnswers = JSON.parse(localStorage.getItem(`quizAnswers`));

  if (!resultBox) {
    return;
  }

 // Show message if no quiz was taken.
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

  // Insert result content into the page.
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

function handleQuizSubmit(event) {
  event.preventDefault();

  const answers = getSelectedAnswers();

  // Check if quiz is complete.
  if (answers.length < totalQuestions) {
    alert(`Please answer all ${totalQuestions} questions before seeing your result.`);
    return;
  }

  saveAnswers(answers);
  window.location.href = `results.html`;
}

function clearSavedResult() {
  // Reset quiz results.
  localStorage.removeItem(`quizAnswers`);
  displayResult();
}

document.addEventListener(`DOMContentLoaded`, () => {
  const quizForm = document.querySelector(`#quizForm`);
  const clearButton = document.querySelector(`#clearResult`);

  if (quizForm) {
    quizForm.addEventListener(`submit`, handleQuizSubmit);
  }

  if (clearButton) {
    clearButton.addEventListener(`click`, clearSavedResult);
  }

  displayResult();
});