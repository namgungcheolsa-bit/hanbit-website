const allergyCodes = {
  "01": "난류", "02": "우유", "03": "메밀", "04": "땅콩", "05": "대두",
  "06": "밀", "07": "고등어", "08": "게", "09": "새우", "10": "돼지고기",
  "11": "복숭아", "12": "토마토", "13": "아황산류", "14": "호두", "15": "닭고기",
  "16": "쇠고기", "17": "오징어", "18": "조개류", "19": "잣"
};

// ▼▼▼ [추가] allergyImages 객체를 추가합니다. ▼▼▼
const allergyImages = {
  "01": "images/01.png", "02": "images/02.png", "03": "images/03.png",
  "04": "images/04.png", "05": "images/05.png", "06": "images/06.png",
  "07": "images/07.png", "08": "images/08.png", "09": "images/09.png",
  "10": "images/10.png", "11": "images/11.png", "12": "images/12.png",
  "13": "images/13.png", "14": "images/14.png", "15": "images/15.png",
  "16": "images/16.png", "17": "images/17.png", "18": "images/18.png",
  "19": "images/19.png"
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("allergy-checkboxes");
  Object.entries(allergyCodes).forEach(([code, label]) => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-check";

    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.id = `allergy-${code}`;
    checkbox.value = code;
    checkbox.name = "allergies";

    const labelElement = document.createElement("label");
    labelElement.className = "form-check-label";
    labelElement.setAttribute("for", `allergy-${code}`);
    
    // ▼▼▼ [수정] textContent 대신 innerHTML을 사용합니다. ▼▼▼
    const imgSrc = allergyImages[code]; // 이미지 경로 가져오기
    labelElement.innerHTML = `
      <span>${label}</span>
      <img src="${imgSrc}" alt="${label}" class="allergy-icon-small">
    `;
    // ▲▲▲ [수정] 여기까지 ▲▲▲

    wrapper.appendChild(checkbox);
    wrapper.appendChild(labelElement);
    container.appendChild(wrapper);
  });

  document.getElementById("next-btn")?.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[name='allergies']:checked");
    const selectedAllergies = Array.from(checkboxes).map(cb => cb.value);
    const userName = document.getElementById("name-input")?.value || "";
    localStorage.setItem("userAllergies", JSON.stringify(selectedAllergies));
    localStorage.setItem("userName", userName);
    window.location.href = "menu.html";
  });
});