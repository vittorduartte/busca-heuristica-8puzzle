$(document).ready(() => {

    $(".board__element:not(.is-gap)").on("click", (event) => {
        var gapLocalization = $(".board__element.is-gap").attr('id');
        var target = $(event.target);
        var targetLocalization = target.attr('id');

        if ((Number(targetLocalization)).toFixed(1) == (Number(gapLocalization) + 0.1).toFixed(1) ||
            (Number(targetLocalization)).toFixed(1) == (Number(gapLocalization) - 0.1).toFixed(1) ||
            (Number(targetLocalization)).toFixed(1) == (Number(gapLocalization) + 1).toFixed(1) ||
            (Number(targetLocalization)).toFixed(1) == (Number(gapLocalization) - 1).toFixed(1)) 
        {
            var targetValue = target.contents().text().trim();

            $(".board__element.is-selected").removeClass('is-selected');
            target.addClass("is-selected");
        }
    });

});