import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import octagonIcon from '../img/bi_x-octagon.svg';
import checkIcon from '../img/bi_check2-circle.svg';

const stateForm = document.querySelector('form.form');
stateForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const expectedResult = form.elements.state.value === 'fulfilled';
  const promiseTimeout = form.elements.delay.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (expectedResult) {
        resolve(promiseTimeout);
      } else reject(promiseTimeout);
    }, promiseTimeout);
  });
  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        iconUrl: checkIcon,
        iconColor: '#FFFFFF',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
        progressBarColor: '#326101',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        position: 'topCenter',
        iconUrl: octagonIcon,
        iconColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        progressBarColor: '#B51B1B',
      });
    });
});
