$(document).ready(function () {
    $(".favorite-btn").click(function (e) {
        e.preventDefault();


        var $btn = $(this);
        var postId = $btn.data("post-id");
        var $icon = $btn.find("i");
        var isSaved = $icon.hasClass("fa-solid");

        if (isSaved) {
            if (!confirm("Bài đăng này đã được lưu. Bạn có chắc muốn bỏ lưu?")) {
                return;
            }
        }

        $.ajax({
            url: '/Post/ToggleFavorite',
            type: 'POST',
            data: { postId: postId },
            success: function (result) {
                if (result.status === 'added') {
                    $icon.removeClass("fa-regular").addClass("fa-solid");
                } else if (result.status === 'removed') {
                    $icon.removeClass("fa-solid").addClass("fa-regular");

                    // Nếu đang ở trang favorites, xoá bài khỏi DOM
                    if (window.location.pathname.toLowerCase().includes("/favorites")) {
                        $btn.closest(".col-md-8").remove();
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error("Lỗi khi xử lý lưu/bỏ lưu bài đăng:", error);
            }
        });
    });
});
