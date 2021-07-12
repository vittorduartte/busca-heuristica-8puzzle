function stateNow() {
    var stateNow = $(".board__element");
    var board = [];
    var gap_localization = 0;
    stateNow.map((index, item) => {
        if(item.innerHTML.trim()) {
            board.push(item.innerHTML.trim());
        } else {
            board.push('gap');
            gap_localization = index;
        }   
    })
    return {
        board,
        gap_localization
    }
}

$(function () {

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
        }
        
        console.log(stateNow());
    });

});