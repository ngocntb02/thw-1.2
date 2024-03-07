document.addEventListener('DOMContentLoaded', function() {
    const infoForm = document.getElementById('infoForm');
    const surveySection = document.querySelector('.survey');
    const resultSection = document.getElementById('result');

    infoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(infoForm);
        const resultData = {};
        for (let pair of formData.entries()) {
            resultData[pair[0]] = pair[1];
        }

        // Lấy thông tin tiểu sử từ người dùng và ẩn form nhập
        const fullName = resultData.fullName;
        const dob = resultData.dob;
        const cccd = resultData.cccd;
        const address = resultData.address;
        infoForm.style.display = 'none';

        // Hiển thị các nhóm câu hỏi
        surveySection.style.display = 'block';

        // Danh sách các câu hỏi
    const questions = [
        // Nhóm 1: Lựa chọn đúng/sai
        { type: 'trueFalse', question: 'Câu 1: Có phải bạn thích hành động nhiều hơn học sách?' },
        { type: 'trueFalse', question: 'Câu 2: Bạn có thích đọc sách như một sở thích hàng ngày không?' },
        { type: 'trueFalse', question: 'Câu 3: Bạn có tin rằng việc tập thể dục hàng ngày có lợi cho sức khỏe của bạn?' },
        { type: 'trueFalse', question: 'Câu 4: Bạn có tin rằng việc đầu tư vào bản thân là cần thiết?' },
        { type: 'trueFalse', question: 'Câu 5: Bạn có tin rằng việc giữ gìn môi trường là trách nhiệm của mỗi người?' },
        { type: 'trueFalse', question: 'Câu 6: Bạn có nghĩ rằng hạnh phúc có thể đo bằng tiền bạc?' },
        { type: 'trueFalse', question: 'Câu 7: Bạn có tin rằng việc giáo dục là chìa khóa cho thành công?' },
        { type: 'trueFalse', question: 'Câu 8: Bạn có tin rằng may mắn đóng một vai trò quan trọng trong cuộc sống?' },
        { type: 'trueFalse', question: 'Câu 9: Bạn có tin rằng trẻ em nên được trải nghiệm nhiều hoạt động ngoại khóa?' },
        { type: 'trueFalse', question: 'Câu 10: Bạn có tin rằng hòa bình trên thế giới là điều có thể đạt được?' },
        // Nhóm 2: Chọn 1 trong 4 đáp án
        { type: 'multipleChoice', question: 'Câu 11: Bạn thích hình thức nghệ thuật nào nhất sau đây: hội họa, âm nhạc, điện ảnh, văn học?', options: ['Hội họa', 'Âm nhạc', 'Điện ảnh', 'Văn học'] },
        { type: 'multipleChoice', question: 'Câu 12: Trong các loại thể thao sau, bạn thích loại nào nhất: bóng đá, bóng rổ, bơi lội, cầu lông?', options: ['Bóng đá', 'Bóng rổ', 'Bơi lội', 'Cầu lông'] },
        { type: 'multipleChoice', question: 'Câu 13: Bạn nghĩ rằng nơi nào đẹp nhất: núi, biển, rừng, đồng cỏ?', options: ['Núi', 'Biển', 'Rừng', 'Đồng cỏ'] },
        { type: 'multipleChoice', question: 'Câu 14: Bạn thích ăn loại thức ăn nào nhất: pizza, sushi, pasta, bánh mì?', options: ['Pizza', 'Sushi', 'Pasta', 'Bánh mì'] },
        { type: 'multipleChoice', question: 'Câu 15: Trong các mùa trong năm, mùa nào bạn yêu thích nhất: xuân, hạ, thu, đông?', options: ['Xuân', 'Hạ', 'Thu', 'Đông'] },
        { type: 'multipleChoice', question: 'Câu 16: Bạn thích xem loại phim nào nhất: hành động, tình cảm, kinh dị, hài hước?', options: ['Hành động', 'Tình cảm', 'Kinh dị', 'Hài hước'] },
        { type: 'multipleChoice', question: 'Câu 17: Bạn thích đến quốc gia nào nhất: Pháp, Nhật Bản, Mỹ, Úc?', options: ['Pháp', 'Nhật Bản', 'Mỹ', 'Úc'] },
        { type: 'multipleChoice', question: 'Câu 18: Trong các loại động vật sau, bạn thích loại nào nhất: chó, mèo, hổ, gấu?', options: ['Chó', 'Mèo', 'Hổ', 'Gấu'] },
        { type: 'multipleChoice', question: 'Câu 19: Bạn thích loại nhạc nào nhất: pop, rock, jazz, classical?', options: ['Pop', 'Rock', 'Jazz', 'Classical'] },
        { type: 'multipleChoice', question: 'Câu 20: Bạn nghĩ rằng loại phương tiện giao thông nào là tiện lợi nhất: ô tô, xe máy, xe buýt, đạp xe?', options: ['Ô tô', 'Xe máy', 'Xe buýt', 'Đạp xe'] },
        // Nhóm 3: Chọn nhiều đáp án trong 4 đáp án
        { type: 'multipleSelection', question: 'Câu 21: Bạn thích môn nghệ thuật nào: vẽ, hát, nhảy, kịch?', options: ['Vẽ', 'Hát', 'Nhảy', 'Kịch'] },
        { type: 'multipleSelection', question: 'Câu 22: Trong việc du lịch, bạn thích thăm địa điểm nào: di tích lịch sử, thiên nhiên hoang dã, thành phố sôi động, bãi biển?', options: ['Di tích lịch sử', 'Thiên nhiên hoang dã', 'Thành phố sôi động', 'Bãi biển'] },
        { type: 'multipleSelection', question: 'Câu 23: Trong các món ăn sau, bạn thích món nào: salad, bò kho, sushi, pizza?', options: ['Salad', 'Bò kho', 'Sushi', 'Pizza'] },
        { type: 'multipleSelection', question: 'Câu 24: Bạn sẽ chọn màu sắc nào để làm màu sắc chính trong phòng ngủ của mình: xanh lá cây, đỏ, vàng, xanh dương?', options: ['Xanh lá cây', 'Đỏ', 'Vàng', 'Xanh dương'] },
        { type: 'multipleSelection', question: 'Câu 25: Trong việc giải trí, bạn thích loại hoạt động nào: xem phim, đọc sách, chơi game, thể dục?', options: ['Xem phim', 'Đọc sách', 'Chơi game', 'Thể dục'] },
        { type: 'multipleSelection', question: 'Câu 26: Trong việc mua sắm, bạn thích mua đồ ở đâu nhất: siêu thị, chợ truyền thống, trung tâm thương mại, trên mạng?', options: ['Siêu thị', 'Chợ truyền thống', 'Trung tâm thương mại', 'Trên mạng'] },
        { type: 'multipleSelection', question: 'Câu 27: Bạn thích đọc loại sách nào nhất: tiểu thuyết, tự truyện, sách học hỏi, sách hướng dẫn?', options: ['Tiểu thuyết', 'Tự truyện', 'Sách học hỏi', 'Sách hướng dẫn'] },
        { type: 'multipleSelection', question: 'Câu 28: Bạn thích môn thể thao nào: bóng đá, cầu lông, bơi lội, võ thuật?', options: ['Bóng đá', 'Cầu lông', 'Bơi lội', 'Võ thuật'] },
        { type: 'multipleSelection', question: 'Câu 29: Bạn thích loại hoa nào nhất: hồng, hoa cúc, hoa hướng dương, hoa lan?', options: ['Hồng', 'Hoa cúc', 'Hoa hướng dương', 'Hoa lan'] },
        { type: 'multipleSelection', question: 'Câu 30: Bạn thích loại đồ uống nào: cà phê, trà, nước ngọt, nước ép?', options: ['Cà phê', 'Trà', 'Nước ngọt', 'Nước ép'] },
        // Nhóm 4: Trả lời tự luận
        { type: 'freeText', question: 'Câu 31: Nếu bạn có một triệu đô la, bạn sẽ làm gì với số tiền đó?' },
        { type: 'freeText', question: 'Câu 32: Điều gì làm bạn cảm thấy hạnh phúc nhất trong cuộc sống?' },
        { type: 'freeText', question: 'Câu 33: Mục tiêu lớn nhất của bạn trong tương lai là gì?' },
        { type: 'freeText', question: 'Câu 34: Bạn nghĩ rằng công việc lý tưởng của một người là gì?' },
        { type: 'freeText', question: 'Câu 35: Bạn thích môi trường làm việc như thế nào?' },
        { type: 'freeText', question: 'Câu 36: Điều gì làm bạn khó chịu nhất trong một ngày làm việc?' },
        { type: 'freeText', question: 'Câu 37: Bạn nghĩ rằng sự thành công được định nghĩa như thế nào?' },
        { type: 'freeText', question: 'Câu 38: Nếu bạn có thể thay đổi một điều về thế giới ngày nay, đó sẽ là gì?' },
        { type: 'freeText', question: 'Câu 39: Điều gì làm bạn cảm thấy tự hào nhất trong cuộc sống của bạn?' },
        { type: 'freeText', question: 'Câu 40: Bạn nghĩ rằng giá trị quan trọng nhất trong một mối quan hệ là gì?' }
    ];

        // Trong vòng lặp forEach để tạo các câu hỏi
        questions.forEach((question, index) => {
            const groupIndex = Math.floor(index / 10) + 1; // Tính toán nhóm của câu hỏi
            let groupTitle = document.querySelector(`#group${groupIndex}`);
            if (!groupTitle) {
                groupTitle = document.createElement('h3');
                groupTitle.id = `group${groupIndex}`;
                groupTitle.textContent = `Nhóm ${groupIndex}`;
                surveySection.appendChild(groupTitle);
            }

            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p><strong>${question.question}</strong></p>
            `;

            // Tùy thuộc vào loại câu hỏi, thêm các trường vào câu hỏi
            if (question.type === 'trueFalse') {
                questionElement.innerHTML += `
                    <label><input type="radio" name="question${index + 1}" value="true"> Đúng</label>
                    <label><input type="radio" name="question${index + 1}" value="false"> Sai</label>
                `;
            } else if (question.type === 'multipleChoice') {
                question.options.forEach((option, optionIndex) => {
                    questionElement.innerHTML += `
                        <label><input type="radio" name="question${index + 1}" value="${option}"> ${option}</label>
                    `;
                });
            } else if (question.type === 'multipleSelection') {
                question.options.forEach((option, optionIndex) => {
                    questionElement.innerHTML += `
                        <label><input type="checkbox" name="question${index + 1}" value="${option}"> ${option}</label>
                    `;
                });
            } else if (question.type === 'freeText') {
                questionElement.innerHTML += `
                    <textarea id="question${index + 1}" name="question${index + 1}" rows="4" cols="50"></textarea>
                `;
            }

            surveySection.appendChild(questionElement);
        });

        // Hiển thị nút submit kết quả khảo sát
        surveySection.innerHTML += `<button id="submitSurvey">Hoàn Thành Khảo Sát</button>`;
    });

    // Xử lý khi người dùng hoàn thành khảo sát và gửi kết quả
    surveySection.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'submitSurvey') {
            event.preventDefault();
            const formData = new FormData(infoForm);
            const resultData = {};
            for (let pair of formData.entries()) {
                resultData[pair[0]] = pair[1];
            }

            // Lấy câu trả lời của từng câu hỏi
            const answers = {};
            const questions = document.querySelectorAll('.question');
            questions.forEach((question, index) => {
                const inputType = question.querySelectorAll('input[type="radio"]:checked');
                if (inputType.length > 0) {
                    answers[question.querySelector('p').textContent] = inputType[0].value;
                } else {
                    const inputCheckboxes = question.querySelectorAll('input[type="checkbox"]:checked');
                    const selectedOptions = [];
                    inputCheckboxes.forEach(checkbox => {
                        selectedOptions.push(checkbox.value);
                    });
                    answers[question.querySelector('p').textContent] = selectedOptions;
                }
            });

            // Hiển thị thông tin tiểu sử và kết quả khảo sát
            resultSection.innerHTML = `
                <div class="result-container">
                    <h2>Thông Tin Tiểu Sử</h2>
                    <ul>
                        <li><strong>Họ và Tên:</strong> ${resultData.fullName}</li>
                        <li><strong>Ngày Tháng Năm Sinh:</strong> ${resultData.dob}</li>
                        <li><strong>Căn Cước Công Dân (CCCD):</strong> ${resultData.cccd}</li>
                        <li><strong>Địa Chỉ Thường Trú:</strong> ${resultData.address}</li>
                    </ul>
                    <h2>Kết Quả Khảo Sát</h2>
                    <pre>${JSON.stringify(answers, null, 2)}</pre>
                </div>
            `;
            resultSection.style.display = 'block';
        }
    });
});