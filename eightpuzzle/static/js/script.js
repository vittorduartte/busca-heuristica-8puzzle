function stateNow() {
    
    board = [
        [
            $("#1x1").text().trim() ? Number($("#1x1").text().trim()) : 0,
            $("#1x2").text().trim() ? Number($("#1x2").text().trim()) : 0,
            $("#1x3").text().trim() ? Number($("#1x3").text().trim()) : 0
        ],
        [
            $("#2x1").text().trim() ? Number($("#2x1").text().trim()) : 0,
            $("#2x2").text().trim() ? Number($("#2x2").text().trim()) : 0,
            $("#2x3").text().trim() ? Number($("#2x3").text().trim()) : 0
        ],
        [
            $("#3x1").text().trim() ? Number($("#3x1").text().trim()) : 0,
            $("#3x2").text().trim() ? Number($("#3x2").text().trim()) : 0,
            $("#3x3").text().trim() ? Number($("#3x3").text().trim()) : 0
        ]
    ];

    return { board }
}

function selectBoardInput() {
    var board = $(".input-board").val().split(',').map((item, index) => {return item.trim() });
    if(board.length == 9) {
        selectBoardAndInformation({ board });
    } else {
        alert('Atenção: board incorreto.');
        return false;
    }
}

function selectBoardAndInformation(data) {
    $(".information").empty();
    var board_list = $(".board__element");

    board_list.map((index, item) => {
        item.innerText = "";
        if (data.board[index] == "0") {
            $(`.board__element#${item.id}`).attr("class", "board__element is-gap");
        } else {
            $(`.board__element#${item.id}`).attr("class", "board__element");
        }
        item.append(data.board[index] != "0" ? data.board[index] : '');
    })

    $(".information").append(`
        <li>Nível: ${data.step ? data.step : 'None'} </li>
        <li>Board: ${data.board ? data.board : 'None'}</li>
        <li>Ação: ${data.action ? data.action : 'None'}</li>
        <li>Custo: ${data.coust ? data.coust : 'None'}</li>
        <li>Heurística: ${data.heuristic ? data.heuristic : 'None'}</li>
        <li>Score: ${data.score ? data.score : 'None'}</li>
    `)

}

function boardShuffle() {
    var board = [
        $("#1x1"),
        $("#1x2"),
        $("#1x3"),
        $("#2x1"),
        $("#2x2"),
        $("#2x3"),
        $("#3x1"),
        $("#3x2"),
        $("#3x3")
    ];

    var count = 1000;
    var max = board.length;
    var past = 0;

    while (count) {
        var choose = board[Math.floor(Math.random() * max)];
        if (choose.prop("classList")[1] != 'is-gap') {
            choose.trigger("click")
            past = choose
            count--;
        }

    }

}

$(function () {

    $(document).on("click", ".move", function (event) {
        var target = $(event.target);
        var classTarget = target.attr("id");
        var step = $(`.${classTarget}#step`).val()
        var board = $(`.${classTarget}#board`).val().split(',');
        var action = $(`.${classTarget}#action`).val();
        var coust = $(`.${classTarget}#coust`).val();
        var score = $(`.${classTarget}#score`).val();
        var heuristic = $(`.${classTarget}#heuristic`).val();

        selectBoardAndInformation({ step, board, action, coust, score, heuristic });
    });

    $(document).on("click", ".board__element:not(.is-gap)", function (event) {
        var gapLocalization = $(".board__element.is-gap").attr("id").split('x');
        var target = $(event.target);
        var targetLocalization = target.attr("id").split('x');

        if (Number(targetLocalization[1]) == Number(gapLocalization[1]) + 1 && targetLocalization[0] == gapLocalization[0] ||
            Number(targetLocalization[1]) == Number(gapLocalization[1]) - 1 && targetLocalization[0] == gapLocalization[0] ||
            Number(targetLocalization[0]) == Number(gapLocalization[0]) + 1 && targetLocalization[1] == gapLocalization[1] ||
            Number(targetLocalization[0]) == Number(gapLocalization[0]) - 1 && targetLocalization[1] == gapLocalization[1]) {

            var targetValue = target.contents().text().trim();
            target.text('');

            $(`#${gapLocalization[0]}x${gapLocalization[1]}`).text(targetValue);

            $(".board__element.is-gap").removeClass("is-gap");
            target.addClass("is-gap");

            return { success: true };
        }
    });

    $(document).on("click", "#shuffle", function () {
        boardShuffle();
    });

    $(document).on("click", "#text-board", function(){
        selectBoardInput();
    });

    $(document).on("click", "#resolver", function () {

        $("ul.path").empty();
        $(".path_time").empty();
        $(".information").empty();
        $(".information").append(`
        <li>Nível: None</li>
        <li>Estado: None</li>
        <li>Ação: None</li>
        <li>Custo: None</li>
        <li>Heurística: None</li>
        <li>Score: None</li>
        `);

        $.ajax({
            method: "POST",
            url: `/api/v1/solver`,
            data: JSON.stringify(stateNow()),
            contentType: "application/json",
            beforeSend: () => {
                $("#resolver").html('<i class="fas fa-spinner is-loading"></i>');
            }
        }).then((data) => {
            console.log(data.time);
            data.data.path.map((item, index) => {
                list = $("ul.path");
                list.append(`<li class="move" id="state_${item.step}">Estado: ${item.step} - Ação: ${item.action ? item.action : "Nenhuma"} - Custo: ${item.coust} - Score: ${item.score} 
                                 <input class="state_${item.step}" id="board" type="hidden" value="${item.board}"/>
                                 <input class="state_${item.step}" id="step" type="hidden" value="${item.step}"/>
                                 <input class="state_${item.step}" id="action" type="hidden" value="${item.action}"/>
                                 <input class="state_${item.step}" id="coust" type="hidden" value="${item.coust}"/>
                                 <input class="state_${item.step}" id="score" type="hidden" value="${item.score}"/>
                                 <input class="state_${item.step}" id="heuristic" type="hidden" value="${item.heuristic}"/>
                             </li>`);
                $("#resolver").html('Resolver');

            });
            $(".path_time").append(document.createTextNode(`Tempo total: ${data.time} segundo(s)`))

        }).fail((err) => {
            alert("Error: ", err);
        });

    });

});