const allergyCodes = {
  "01": "난류", "02": "우유", "03": "메밀", "04": "땅콩", "05": "대두",
  "06": "밀", "07": "고등어", "08": "게", "09": "새우", "10": "돼지고기",
  "11": "복숭아", "12": "토마토", "13": "아황산류", "14": "호두", "15": "닭고기",
  "16": "쇠고기", "17": "오징어", "18": "조개류(굴, 전복, 홍합 포함)", "19": "잣"
};

// 알레르기 이미지 경로 객체
const allergyImages = {
  "01": "images/01.png", "02": "images/02.png", "03": "images/03.png",
  "04": "images/04.png", "05": "images/05.png", "06": "images/06.png",
  "07": "images/07.png", "08": "images/08.png", "09": "images/09.png",
  "10": "images/10.png", "11": "images/11.png", "12": "images/12.png",
  "13": "images/13.png", "14": "images/14.png", "15": "images/15.png",
  "16": "images/16.png", "17": "images/17.png", "18": "images/18.png",
  "19": "images/19.png"
};

const userAllergies = JSON.parse(localStorage.getItem("userAllergies")) || [];
const userName = localStorage.getItem("userName") || "";

// ▼▼▼ [수정] '오늘 날짜' 기준으로 currentIndex 계산하기 ▼▼▼

/**
 * 오늘 날짜를 "YYYY-MM-DD" 형식의 문자열로 반환합니다.
 */
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0-11) + 1
  const day = String(today.getDate()).padStart(2, '0');      // 일
  return `${year}-${month}-${day}`; // 예: "2025-11-18"
}

// 1. 'meals' 배열에서 오늘 날짜와 일치하는 인덱스를 찾습니다.
// (주의: meals.js가 이 파일보다 먼저 로드되어 'meals' 변수가 존재해야 함)
const todayString = getTodayString();
const todayIndex = meals.findIndex(meal => meal.date === todayString);

// 2. 'currentIndex' 초기값을 설정합니다.
//    - 오늘 날짜를 찾으면 (todayIndex가 -1이 아니면) 해당 인덱스 사용
//    - 못 찾으면 (주말이거나 식단표에 없으면) 0 (첫 번째 날짜)을 기본값으로 사용
let currentIndex = (todayIndex !== -1) ? todayIndex : 0;

// ▲▲▲ [수정] 여기까지 ▲▲▲

document.getElementById("user-name").innerText = `안녕하세요, ${userName}님!`;

// (meals 배열은 meals.js에서 불러오므로 여기 없습니다)

function renderMenu() {
  // ... (이하 renderMenu 함수는 기존과 동일) ...
  const meal = meals[currentIndex];
  document.getElementById("date-info").innerText = `${meal.date} (${meal.day}) 급식`;
  const warningList = [];
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = "";

  meal.menu.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    
    const allergens = item.allergens?.map(a => String(a).padStart(2, '0')) || [];
    const userMatchedAllergens = allergens.filter(code => userAllergies.includes(code));

    let iconHtml = '';
    if (userMatchedAllergens.length > 0) {
      iconHtml = userMatchedAllergens.map(code => {
        return `<img src="${allergyImages[code]}" alt="${allergyCodes[code]}" class="menu-item-icon icon-danger">`;
      }).join(' ');
    }

    li.innerHTML = `
      <span class="menu-item-name">${item.name}</span>
      <span class="menu-item-icons">${iconHtml}</span>
    `;

    const matched = userMatchedAllergens.length > 0;
    
    if (matched) {
      li.classList.add("text-danger", "fw-bold");
      userMatchedAllergens.forEach(code => {
        if (!warningList.includes(code)) {
          warningList.push(code);
        }
      });
    }

    menuList.appendChild(li);
  });

  const warningBox = document.getElementById("warning-box");
  if (warningList.length > 0) {
    const warningHtmlElements = warningList.map(code => {
      const name = allergyCodes[code];
      const imgSrc = allergyImages[code]; 
      return `
        <span class="allergy-item">
          ${name}
          <img src="${imgSrc}" alt="${name}" class="allergy-icon">
        </span>
      `;
    }).join(" ");
    warningBox.innerHTML = `⚠️ 주의: ${warningHtmlElements} 알레르기 포함 음식이 있습니다.`;
  } else {
    warningBox.innerHTML = "문제 없는 급식입니다! 😊";
  }
}

// ... (이하 버튼 이벤트 리스너는 기존과 동일) ...
document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < meals.length - 1) {
    currentIndex++;
    renderMenu();
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderMenu();
  }
});

// 마지막으로 renderMenu() 호출
renderMenu();