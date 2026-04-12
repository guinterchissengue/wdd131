// Wait until everything loads
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("quizForm");

  // Handle quiz submission
  if (form) {

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const selected = document.querySelectorAll('input[type="radio"]:checked');

      // Check if all questions were answered
      if (selected.length < 5) {
        alert("Please answer all questions!");
        return;
      }

      const answers = Array.from(selected).map(input => input.value);

      // Save answers locally
      localStorage.setItem("quizAnswers", JSON.stringify(answers));

      window.location.href = "results.html";
    });
  }

  // Show results
  const resultBox = document.getElementById("resultBox");

  if (resultBox) {

    const answers = JSON.parse(localStorage.getItem("quizAnswers"));

    const careers = {
      tech: {
        title: " Computer Science / Software Engineering",
        description: "You enjoy problem-solving and technology."
      },
      business: {
        title: " Business Administration / Marketing",
        description: "You have leadership and strategic thinking skills."
      },
      health: {
        title: " Medicine / Nursing",
        description: "You care about helping others."
      },
      creative: {
        title: " Design / Arts",
        description: "You are imaginative and expressive."
      }
    };

    if (!answers) {
      resultBox.innerHTML = "<p>Please complete the quiz first.</p>";
      return;
    }

    const count = {};

    answers.forEach(ans => {
      count[ans] = (count[ans] || 0) + 1;
    });

    const top = Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );

    resultBox.innerHTML = `
      <h2>Your Recommended Career Path</h2>
      <p><strong>${careers[top].title}</strong></p>
      <p>${careers[top].description}</p>
    `;
  }

});