/* =========================================================
   SBSDYNAMICS PROJECT DATABASE
   =========================================================

   This is the file you normally edit whenever you want
   to add another project.

   Add the project image to /assets and then add another
   project object below.

   ========================================================= */


const projects = [



  /* =======================================================
     PROJECT 1
     ======================================================= */

  {

    title:
      "Hydroponics System",


    status:
      "R&D Phase",


    image:
      "assets/project1.jpg",


    description:
      "A fully automated hydroponics platform designed to monitor plant health, control nutrient flow, and manage environmental conditions in real time.",


    layers: [

      "Hardware: ESP32, relays, sensors",

      "Backend: Node.js, AWS RDS, RabbitMQ",

      "Frontend: Android (Java/Kotlin), MPAndroidChart"

    ],


    /*
      Leave blank if there is no GitHub link yet.
    */

    github:
      "",


    /*
      Leave blank if there is no live demo.
    */

    demo:
      ""

  },



  /* =======================================================
     PROJECT 2
     ======================================================= */

  {

    title:
      "Music Enhancer App",


    status:
      "R&D Phase",


    image:
      "assets/project2.jpg",


    description:
      "A digital audio enhancement tool designed to apply custom slow, pitch-shifted, and atmospheric effects to music.",


    layers: [

      "Engine: Audio processing algorithms with AI/ML involvement",

      "Backend: Python for audio processing and storage",

      "Frontend: Python UI or Command Line Interface"

    ],


    github:
      "",


    demo:
      ""

  }



  /* =======================================================
     ADD NEW PROJECTS BELOW
     =======================================================

     Example:

     ,

     {

       title:
         "FPGA Control System",

       status:
         "Completed",

       image:
         "assets/fpga-project.jpg",

       description:
         "An FPGA-based digital control system designed and tested using VHDL.",

       layers: [

         "Hardware: Altera FPGA",

         "Logic Design: VHDL",

         "Testing: Simulation and hardware validation",

         "Systems Engineering: Requirements and verification"

       ],

       github:
         "https://github.com/YOUR_USERNAME/YOUR_PROJECT",

       demo:
         ""

     }

     ======================================================= */


];