$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function() {
        a("#contactForm").submit(function(c) {
            c.preventDefault();
            a("#contactSubmit").html("Wait..").attr("disabled", "disabled");
            var b = a.ajax({
                url: "/scripts/signup.php",
                type: "post",
                data: a("#contactForm").serialize(),
                success: function(d) {
                    a("#contactSubmit").html("Subscribed...").attr("disabled", "disabled")
                },
                error: function(d) {
                    a("#contactSubmit").html("Failed...").attr("disabled", "disabled");
                    setTimeout(function() {
                        a("#contactSubmit").html("Subscribe").prop("disabled", false)
                    }, 2000)
                }
            })
        })
})

