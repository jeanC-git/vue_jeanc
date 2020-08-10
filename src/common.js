import { mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        getError(error) {
            if (error && error.response.data.msg && error.response.data.cod) {
                vue.swal(
                    `Mensaje de sistema: ${error.response.data.msg}`,
                    "warning",
                    2500,
                    "top",
                    "fadeInDown",
                    "fadeOut"
                );
                switch (error.response.data.cod) {
                    case "100-00002":
                        setTimeout(() => {
                            vue.logout();
                        }, 3000);
                        break;
                }
            }
        },
        swal(title, type, timer, position, showClass, hideClass) {
            let vue = this;
            const Toast = vue.$swal.mixin({
                toast: true,
                position: position,
                showConfirmButton: false,
                timer: timer,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__' + showClass
                },
                hideClass: {
                    popup: 'animate__animated animate__' + hideClass
                },
                onOpen: toast => {
                    toast.addEventListener("mouseenter", vue.$swal.stopTimer);
                    toast.addEventListener("mouseleave", vue.$swal.resumeTimer);
                }
            });
            Toast.fire({
                icon: type,
                title:
                    "<p class='font-sacramento' style='font-family: Arial, sans-serif'>" +
                    title +
                    "</p>"
            });
        },

    },
}