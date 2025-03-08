// options.js
document.addEventListener("DOMContentLoaded", () => {
  const titlesInput = document.getElementById("titlesInput");
  const saveBtn = document.getElementById("saveBtn");
  const statusMsg = document.getElementById("statusMsg");

  // 1) 페이지가 열릴 때, 기존에 저장된 desiredTitles 불러오기
  chrome.storage.sync.get(["desiredTitles"], (result) => {
    const savedTitles = result.desiredTitles || [];
    // 줄바꿈으로 합쳐서 textarea에 표시
    titlesInput.value = savedTitles.join("\n");
  });

  // 2) "저장" 버튼 클릭 시, textarea에 입력된 내용 저장
  saveBtn.addEventListener("click", () => {
    // 줄바꿈 기준으로 배열 변환
    const newTitles = titlesInput.value
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // chrome.storage에 저장
    chrome.storage.sync.set({ desiredTitles: newTitles }, () => {
      statusMsg.textContent = "저장되었습니다!";
      // 잠시 후 메시지 지우기
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 2000);
    });
  });
});
