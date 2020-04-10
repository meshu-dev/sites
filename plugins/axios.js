export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    console.log('CODE', code);
    console.log('CODE', redirect, 999);

    if (code === 401) {
      redirect('/login');
      //$axios.isCancel(error);
    }
  });
}
