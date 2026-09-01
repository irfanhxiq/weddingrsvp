// 4. RSVP GUEST COUNTER LOGIC

let count = 2;

const display = document.getElementById('guestCountDisplay');
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');

if (btnMinus && btnPlus && display) {

  btnMinus.addEventListener('click', function () {

    if (count > 1) {
      count--;
      display.textContent = count;
    }

  });

  btnPlus.addEventListener('click', function () {

    if (count < 20) {
      count++;
      display.textContent = count;
    }

  });

}


// 5. RSVP FORM SUBMISSION TO SUPABASE

const rsvpForm = document.getElementById('rsvpForm');
const thankYouMsg = document.getElementById('thankYouMsg');

if (rsvpForm && thankYouMsg) {

  const submitBtn = rsvpForm.querySelector('.submit-btn');

  rsvpForm.addEventListener('submit', async function (e) {

    e.preventDefault();

    const fullName =
      document.getElementById('fullName').value.trim();

    const side =
      document.querySelector(
        'input[name="side"]:checked'
      )?.value;

    const attendance =
      document.querySelector(
        'input[name="attendance"]:checked'
      )?.value;


    // Check form

    if (!fullName) {

      alert('Sila masukkan nama penuh.');

      return;

    }

    if (!side) {

      alert('Sila pilih pihak jemputan.');

      return;

    }

    if (!attendance) {

      alert('Sila pilih kehadiran.');

      return;

    }


    // Loading

    submitBtn.disabled = true;

    submitBtn.textContent = 'MENGHANTAR...';


    try {

      const { data, error } =
        await supabaseClient

          .from('rsvp')

          .insert({

            full_name: fullName,

            guest_count: count,

            side: side,

            attendance: attendance

          })

          .select();


      // Error

      if (error) {

        console.error(error);

        alert(
          'RSVP tidak berjaya dihantar.\n\n' +
          error.message
        );

        submitBtn.disabled = false;

        submitBtn.textContent = 'HANTAR RSVP';

        return;

      }


      // SUCCESS

      console.log('RSVP berjaya dihantar:', data);


      rsvpForm.style.display = 'none';

      thankYouMsg.style.display = 'flex';


    } catch (error) {

      console.error(error);

      alert(
        'Tidak dapat berhubung dengan server. ' +
        'Sila cuba lagi.'
      );

      submitBtn.disabled = false;

      submitBtn.textContent = 'HANTAR RSVP';

    }

  });

}