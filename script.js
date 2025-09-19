const questions = [
  {q:"National animal of Pakistan?",options:["Snow Leopard","Markhor","Tiger","Ibex"],ans:"Markhor"},
  {q:"First Prime Minister?",options:["Liaquat Ali Khan","Jinnah","Ayub Khan","Bhutto"],ans:"Liaquat Ali Khan"},
  {q:"City of Gardens?",options:["Karachi","Islamabad","Lahore","Peshawar"],ans:"Lahore"},
  {q:"Highest peak?",options:["Nanga Parbat","K2","Tirich Mir","Broad Peak"],ans:"K2"},
  {q:"Year of independence?",options:["1945","1946","1947","1948"],ans:"1947"},
  {q:"National sport?",options:["Cricket","Field Hockey","Kabaddi","Squash"],ans:"Field Hockey"},
  {q:"Mohenjo-Daro is in?",options:["Punjab","Sindh","Balochistan","KP"],ans:"Sindh"},
  {q:"Who designed the flag?",options:["Iqbal","Jinnah","Kedwaii","Liaquat"],ans:"Kedwaii"},
  {q:"Longest river?",options:["Jhelum","Indus","Chenab","Ravi"],ans:"Indus"},
  {q:"Official language?",options:["Urdu","Punjabi","English","Sindhi"],ans:"Urdu"}
];

let current = 0, score = 0, selected = null;
let incorrectAnswers = []; // 🆕 Store wrong attempts

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const remarkEl = document.getElementById('remark');
const restartBtn = document.getElementById('restart-btn');
const incorrectList = document.getElementById('incorrect-list'); // 🆕 UL for wrong answers

function showQuestion() {
  selected = null;
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";
  questionEl.textContent = questions[current].q;

  questions[current].options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => {
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected = opt;
      nextBtn.style.display = "inline-block";
    };
    optionsEl.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  if (selected === questions[current].ans) {
    score++;
  } else {
    // 🆕 Save incorrect answer details
    incorrectAnswers.push({
      question: questions[current].q,
      yourAns: selected || "Not selected",
      correctAns: questions[current].ans
    });
  }
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById('quiz-box').style.display = "none";
  resultBox.style.display = "block";

  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
  if (score >= 9) remarkEl.textContent = "Outstanding!";
  else if (score >= 7) remarkEl.textContent = "Excellent!";
  else if (score >= 5) remarkEl.textContent = "Good effort!";
  else remarkEl.textContent = "Keep learning!";

  // 🆕 Display incorrect answers
  incorrectList.innerHTML = "";
  if (incorrectAnswers.length > 0) {
    incorrectAnswers.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>Q:</strong> ${item.question}<br>
                      <span style="color:red;">Your answer:</span> ${item.yourAns}<br>
                      <span style="color:green;">Correct answer:</span> ${item.correctAns}`;
      incorrectList.appendChild(li);
    });
  } else {
    incorrectList.innerHTML = "<li>No incorrect answers 🎉</li>";
  }
}

restartBtn.onclick = () => {
  current = 0; 
  score = 0; 
  incorrectAnswers = []; // 🆕 Reset wrong answers
  document.getElementById('quiz-box').style.display = "block";
  resultBox.style.display = "none";
  showQuestion();
};

showQuestion();
