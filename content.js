// content.js
(function () {
  // 1) chrome.storage에서 desiredTitles 값을 가져온 뒤, 콜백 안에서 정렬 작업 수행
  chrome.storage.sync.get(["desiredTitles"], (result) => {
    // 기본값(아무것도 입력하지 않았을 때)은 아래처럼 몇 개 지정할 수도 있음
    const defaultTitles = [];

    const desiredTitles =
      result.desiredTitles && result.desiredTitles.length
        ? result.desiredTitles
        : defaultTitles;

    // 2) 전체 컴포넌트가 포함된 부모 컨테이너 선택 (id="findLecture")
    const container = document.getElementById("findLecture");
    if (!container) {
      console.error("컨테이너(#findLecture)를 찾을 수 없습니다.");
      return;
    }

    // 3) 모든 컴포넌트를 배열로 수집 (각 컴포넌트는 "area_selLecCurriculumList" 클래스)
    const lectureItems = Array.from(
      container.getElementsByClassName("area_selLecCurriculumList")
    );

    // 4) 각 항목의 lecSubject 제목을 가져와, desiredTitles에 포함되면 우선순위 높게 정렬
    lectureItems.sort((a, b) => {
      const aTitle = a.querySelector(".lecSubject")?.textContent.trim() || "";
      const bTitle = b.querySelector(".lecSubject")?.textContent.trim() || "";
      const aIndex = desiredTitles.indexOf(aTitle);
      const bIndex = desiredTitles.indexOf(bTitle);

      // 둘 다 원하는 제목에 있으면 배열 순서대로
      if (aIndex > -1 && bIndex > -1) {
        return aIndex - bIndex;
      }
      // a만 원하는 제목이면 앞으로
      if (aIndex > -1) return -1;
      // b만 원하는 제목이면 앞으로
      if (bIndex > -1) return 1;

      // 둘 다 없으면 기존 순서 유지(0 반환)
      return 0;
    });

    // 5) 정렬된 순서대로 다시 DOM에 재배치하고, 원하는 제목인 경우 형광펜 효과(노란색 배경) 적용
    lectureItems.forEach((item) => {
      container.appendChild(item);
      const lecSubjectElement = item.querySelector(".lecSubject");
      if (lecSubjectElement) {
        const titleText = lecSubjectElement.textContent.trim();
        if (desiredTitles.includes(titleText)) {
          lecSubjectElement.style.backgroundColor = "yellow";
        }
      }
    });

    // 6) "margin5" 클래스를 가진 모든 요소 제거
    Array.from(container.getElementsByClassName("margin5")).forEach((el) => {
      el.remove();
    });
  });
})();
