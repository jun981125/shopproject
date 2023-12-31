

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zipcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailaddress").focus();
        }
    }).open();
}


function sample6_execDaumPostcode1() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress1").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress1").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zipcode1').value = data.zonecode;
            document.getElementById("address1").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailaddress1").focus();
        }
    }).open();
}

// const addressCheck = () =>{
// 	btnJoin.disabled = false;
// }
//
// const addressCheck2 = () =>{
// 	btnJoin1.disabled = false;
// }




let idCheckResult = "ok";
let nicknameCheckResult = "ok";
let phoneCheckResult = "ok";

const btnJoin = document.getElementById("btnJoin");

const updateJoinButtonState = () => {
    const btnJoin = document.getElementById("btnJoin");
    const customerid = document.getElementById("customerid").value;
    const nickname = document.getElementById("nickname").value;
    const phonenumber = document.getElementById("phonenumber").value;

    if (idCheckResult === "ok" && nicknameCheckResult === "ok" && phoneCheckResult === "ok"
        && customerid !== "" && nickname !== "" && phonenumber !== "") {
        btnJoin.disabled = false;
    } else {
        btnJoin.disabled = true;
    }
};

// 아이디 중복 검사
const idCheck = () => {
    const customerid = document.getElementById("customerid").value;
    const checkResult = document.getElementById("check-result");

    // 아이디 유효성 검사
    let regex = /^[a-z0-9]{5,20}$/;
    if (!regex.test(customerid)) {
        checkResult.style.color = "red";
        checkResult.style.fontSize = "13px";
        checkResult.innerHTML = "아이디를 올바르게 입력해주세요.";
        idCheckResult = "duplicate"; // 아이디 유효성 검사 실패 시 중복 검사 결과 업데이트
        updateJoinButtonState();
        return;
    }

    // 아이디 중복 검사
    $.ajax({
        type: "post",
        url: "id-Check",
        data: {
            "customerid": customerid
        },
        success: function(res) {
            if (res == "ok") {
                checkResult.style.color = "green";
                checkResult.style.fontSize = "13px";
                checkResult.innerHTML = "사용 가능한 아이디 입니다.";
                idCheckResult = "ok";
            } else {
                checkResult.style.color = "red";
                checkResult.style.fontSize = "13px";
                checkResult.innerHTML = "이미 사용중인 아이디 입니다.";
                idCheckResult = "duplicate";
            }

            updateJoinButtonState();
        },
        error: function(err) {
            console.log("에러발생", err);
        }
    });
};

// 닉네임 중복 검사
const nickCheck = () => {
    const nickname = document.getElementById("nickname").value;
    const nicknameCheckResultElement = document.getElementById("nickname-result");

    // 닉네임 중복 검사
    $.ajax({
        type: "post",
        url: "nickname-Check",
        data: {
            "customernickname": nickname
        },
        success: function(res) {
            if (res == "ok") {
                nicknameCheckResultElement.style.color = "green";
                nicknameCheckResultElement.style.fontSize = "13px";
                nicknameCheckResultElement.innerHTML = "사용 가능한 닉네임입니다.";
                nicknameCheckResult = "ok";
            } else {
                nicknameCheckResultElement.style.color = "red";
                nicknameCheckResultElement.style.fontSize = "13px";
                nicknameCheckResultElement.innerHTML = "사용중인 닉네임입니다.";
                nicknameCheckResult = "duplicate";
            }

            updateJoinButtonState();
        },
        error: function(err) {
            console.log("에러 발생", err);
        }
    });
};

// 휴대전화 중복 검사
const phoneCheck = () => {
    const phone = document.getElementById("phonenumber").value;
    const phoneCheckResultElement = document.getElementById("check-result1");

    // 휴대전화 중복 검사
    $.ajax({
        type: "post",
        url: "phone-Check",
        data: {
            "phonenumber": phone
        },
        success: function(res) {
            if (res == "ok") {
                phoneCheckResultElement.style.color = "green";
                phoneCheckResultElement.style.fontSize = "13px";
                phoneCheckResultElement.innerHTML = "사용 가능한 휴대전화 번호";
                phoneCheckResult = "ok";
            } else {
                phoneCheckResultElement.style.color = "red";
                phoneCheckResultElement.style.fontSize = "13px";
                phoneCheckResultElement.innerHTML = "이미 가입된 번호입니다";
                phoneCheckResult = "duplicate";
            }

            updateJoinButtonState();
        },
        error: function(err) {
            console.log("에러 발생", err);
        }
    });
};



// 판매자 부분 -----------------------------------------------------------------------

let idCheckResult_seller = "ok";
let nicknameCheckResult_seller = "ok";
let phoneCheckResult_seller = "ok";
const btnJoin_seller = document.getElementById("btnJoin1");

const updateJoinButtonState_seller = () => {
    const btnJoin_seller = document.getElementById("btnJoin1");
    const id_seller = document.getElementById("customerid1").value;
    const nick_seller = document.getElementById("nickname1").value;
    const phone_seller = document.getElementById("phonenumber1").value;
    if (idCheckResult_seller === "ok" && nicknameCheckResult_seller === "ok" && phoneCheckResult_seller === "ok"
        && id_seller !== "" && nick_seller !== "" && phone_seller !== "") {
        btnJoin_seller.disabled = false;
    } else {
        btnJoin_seller.disabled = true;
    }
};
const idCheck_seller = () => {
    const customerid1 = document.getElementById("customerid1").value;
    const checkResult2 = document.getElementById("check-result2");

    // 아이디 유효성 검사
    let regex = /^[a-z0-9]{5,20}$/;
    if (!regex.test(customerid1)) {
        checkResult2.style.color = "red";
        checkResult2.style.fontSize = "13px";
        checkResult2.innerHTML = "아이디를 올바르게 입력해주세요.";
        idCheckResult_seller = "duplicate";
        updateJoinButtonState_seller();
        return;
    }

// 아이디 중복 검사
    $.ajax({
        type: "post",
        url: "id-Check1",
        data: {
            "customerid": customerid1
        },
        success: function(res) {
            if (res == "ok") {
                checkResult2.style.color = "green";
                checkResult2.style.fontSize = "13px";
                checkResult2.innerHTML = "사용 가능한 아이디 입니다.";
                idCheckResult_seller = "ok";
            } else {
                checkResult2.style.color = "red";
                checkResult2.style.fontSize = "13px";
                checkResult2.innerHTML = "이미 사용중인 아이디 입니다.";
                idCheckResult_seller = "duplicate";
            }
            updateJoinButtonState_seller();
        },
        error: function(err) {
            console.log("에러발생", err);
        }
    });
};


const nickCheck_seller = () => {
    const nickname = document.getElementById("nickname1").value;
    const sellerCheckResult = document.getElementById("sellernickname-result");

    $.ajax({
        type: "post",
        url: "sellernickname-Check",
        data: {
            "customernickname": nickname
        },
        success: function(res) {
            if (res == "ok") {
                sellerCheckResult.style.color = "green";
                sellerCheckResult.style.fontSize = "13px";
                sellerCheckResult.innerHTML = "사용 가능한 닉네임입니다.";
                nicknameCheckResult_seller = "ok";

            } else {
                sellerCheckResult.style.color = "red";
                sellerCheckResult.style.fontSize = "13px";
                sellerCheckResult.innerHTML = "사용중인 닉네임입니다.";
                nicknameCheckResult_seller = "duplicate";
            }
            updateJoinButtonState_seller();
        },
        error: function(err) {
            console.log("에러 발생", err);
        }
    });
}

const phoneCheck_seller = () => {
    const phone = document.getElementById("phonenumber1").value;
    const phoneCheckResult3 = document.getElementById("check-result3");

    $.ajax({
        type: "post",
        url: "phone-Check1",
        data: {
            "phonenumber": phone
        },
        success: function(res) {
            if (res == "ok") {
                phoneCheckResult3.style.color = "green";
                phoneCheckResult3.style.fontSize = "13px";
                phoneCheckResult3.innerHTML = "사용 가능한 휴대전화 번호";
                phoneCheckResult_seller = "ok";

            } else {
                phoneCheckResult3.style.color = "red";
                phoneCheckResult3.style.fontSize = "13px";
                phoneCheckResult3.innerHTML = "이미 가입된 번호입니다";
                phoneCheckResult_seller = "duplicate";
            }
            updateJoinButtonState_seller();
        },
        error: function(err) {
            console.log("에러 발생", err);
        }
    });
}




// 비밀번호와 비밀번호 확인 체크
function test() {
    var p1 = document.getElementById('passwordhash').value;
    var p2 = document.getElementById('pwd').value;
    if( p1 != p2 ) {
        alert("비밀번호가 일치 하지 않습니다");
        return false;
    } else{
        return true;
    }

}


// 비밀번호와 비밀번호 확인 체크
function test1() {
    var p1 = document.getElementById('passwordhash1').value;
    var p2 = document.getElementById('pwd1').value;
    if( p1 != p2 ) {
        alert("비밀번호가 일치 하지 않습니다");
        return false;
    } else{
        return true;
    }

}




// 일반회원 비밀번호 유효성 검사
$(document).ready(function() {
    $("#passwordhash").keyup(function() {
        let password = $(this).val();
        let messages = [];

        // 비밀번호 길이 체크
        if (password.length >= 5 && password.length <= 16) {
            messages.push('5자 이상, 16자 이하 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('5자 이상, 16자 이하 <span class="check-mark-error">&#10007;</span>');
        }

        // 영문자와 숫자 포함 여부 체크
        if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) {
            messages.push('영문자와 숫자 포함 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('영문자와 숫자 포함 <span class="check-mark-error">&#10007;</span>');
        }

        // 특수문자 포함 여부 체크
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)) {
            messages.push('특수문자 1개 이상 포함 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('특수문자 1개 이상 포함 <span class="check-mark-error">&#10007;</span>');
        }

        // 결과 표시
        let passwordCheck = $("#passwordCheck");
        passwordCheck.html(messages.join('<br>'));

        // 모든 조건이 충족되면 메시지 변경
        if (password.length >= 5 && password.length <= 16 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)) {
            passwordCheck.addClass('password-message');
            passwordCheck.removeClass('error');
            passwordCheck.text('사용 가능한 비밀번호입니다');
        } else {
            passwordCheck.removeClass('password-message');
            passwordCheck.addClass('error');
        }
    });
});



// 판매회원 유효성 검사
$(document).ready(function() {
    $("#passwordhash1").keyup(function() {
        let password = $(this).val();
        let messages = [];

        // 비밀번호 길이 체크
        if (password.length >= 5 && password.length <= 16) {
            messages.push('5자 이상, 16자 이하 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('5자 이상, 16자 이하 <span class="check-mark-error">&#10007;</span>');
        }

        // 영문자와 숫자 포함 여부 체크
        if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) {
            messages.push('영문자와 숫자 포함 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('영문자와 숫자 포함 <span class="check-mark-error">&#10007;</span>');
        }

        // 특수문자 포함 여부 체크
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)) {
            messages.push('특수문자 1개 이상 포함 <span class="check-mark-success">&#10003;</span>');
        } else {
            messages.push('특수문자 1개 이상 포함 <span class="check-mark-error">&#10007;</span>');
        }

        // 결과 표시
        let passwordCheck = $("#passwordCheck1");
        passwordCheck.html(messages.join('<br>'));

        // 모든 조건이 충족되면 메시지 변경
        if (password.length >= 5 && password.length <= 16 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)) {
            passwordCheck.addClass('password-message');
            passwordCheck.removeClass('error');
            passwordCheck.text('사용 가능한 비밀번호입니다');
        } else {
            passwordCheck.removeClass('password-message');
            passwordCheck.addClass('error');
        }
    });
});