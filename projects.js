// Project data


const projects = [


{
  title: "Wireless Motion Detection and Alert System",
  status: "Planning and Development",
  image: "assets/motion-detector.jpg",

  description:
    "An ongoing embedded systems project focused on developing a wireless motion detection and camera monitoring system. The project is currently in the planning and architecture phase, beginning with systems engineering activities such as requirements definition, interface planning, system architecture, and verification planning. The current design uses an ESP32, OV7670 camera, PIR motion sensor, and active buzzer with MQTT communication between the embedded device and a JavaScript based server. The server will process incoming events and provide notifications through a mobile application or messaging service. Server side AI or machine learning capabilities may also be explored as the project develops.",

  layers: [
    "Systems Engineering: Defining requirements, system architecture, interfaces, risks, and planned verification activities",
    "Embedded Hardware: ESP32, OV7670 camera, PIR motion sensor, and active buzzer",
    "Firmware: Embedded software development in C",
    "Communication: MQTT messaging between the embedded system and server",
    "Backend: JavaScript based server for device communication, event processing, and system coordination",
    "Notifications: Planned mobile application or messaging based alerts",
    "AI and ML: Potential server side integration for intelligent image or event analysis",
    "Development: Architecture and implementation are subject to change as prototyping and testing progress"
  ],

  github: "",
  demo: ""
},


{
  title: "CLI Employee Scheduling System",
  status: "Design Phase",
  image: "assets/employee-scheduler.jpg",

  description:
    "An ongoing software project focused on developing a lightweight employee scheduling system that runs entirely through a terminal interface. The current concept allows a user to enter up to ten employees, record individual availability, and generate a proposed schedule using a scheduling algorithm. The program will also support reviewing and modifying schedule information as the design develops. The project is currently in the requirements and design phase, with the architecture and implementation subject to change as development progresses.",

  layers: [
    "Systems Engineering: Defining requirements, scheduling rules, constraints, inputs, outputs, and validation criteria",
    "Programming: Planned implementation in C or C++",
    "Interface: Terminal based command line interface",
    "Data Input: Employee names and individual availability for up to ten employees",
    "Algorithm: Scheduling logic designed to evaluate availability and generate a proposed work schedule",
    "Editing: Planned ability to review and modify employee or schedule information",
    "Validation: Test cases will be developed to verify scheduling behavior and constraint handling",
    "Development: Currently in the design phase with features and implementation subject to change"
  ],

  github: "",
  demo: ""
},














  {
    title: "Smart Power Connector",
    status: "Completed",
    image: "assets/smart-power-connector.jpg",

    description:
      "An end to end embedded systems project focused on developing a smart power monitoring platform that connects physical hardware, embedded software, cloud infrastructure, data storage, and a mobile application. Systems engineering techniques were used to define requirements, organize the system architecture, guide integration, and plan verification across the major system components.",

    layers: [
      "Systems Engineering: Defined requirements, system architecture, interfaces, integration strategy, and verification activities",
      "Embedded Hardware: ESP32 based microcontroller system for device level monitoring and communication",
      "Backend: Node.js services with RabbitMQ messaging and AWS RDS data storage",
      "Application: Android interface for viewing and analyzing system data",
      "Integration: Connected embedded hardware, backend services, database infrastructure, and the user application",
      "Verification: Performed functional testing, troubleshooting, integration testing, and structured system validation"
    ],

    github: "",
    demo: ""
  },


  {
    title: "Smart Intersection System",
    status: "Completed",
    image: "assets/smart-intersection.jpg",

    description:
      "A computer vision and engineering analysis project designed to evaluate intersection behavior using Python, Yolov3, and OpenCV. The system processed visual information, analyzed traffic conditions, and translated the resulting data into useful recommendations for system operation and decision support.",

    layers: [
      "Programming: Developed the analysis workflow using Python",
      "Computer Vision: Used YoloV3 & OpenCV to process and analyze visual traffic information",
      "Analysis: Evaluated system behavior and traffic conditions from collected data",
      "Decision Support: Converted analysis results into actionable recommendations",
      "Validation: Reviewed system outputs to confirm expected behavior and analysis results"
    ],

    github: "",
    demo: ""
  },


  {
    title: "CRC 8 FPGA Implementation",
    status: "Completed",
    image: "assets/crc8-fpga.jpg",

    description:
      "A digital design project focused on developing and validating a CRC 8 implementation through software prototyping and FPGA development. The algorithm was first prototyped in C before being modeled behaviorally in VHDL, synthesized, analyzed, implemented, and tested on a Digilent Nexys A7 FPGA using the AMD Vivado toolchain.",

    layers: [
      "Software Prototyping: Developed and verified the CRC 8 algorithm in C before hardware implementation",
      "HDL Design: Created the digital design using behavioral VHDL modeling",
      "FPGA Hardware: Implemented and tested the design on a Digilent Nexys A7 FPGA",
      "Simulation: Verified data behavior and design operation through waveform analysis",
      "Synthesis: Performed synthesis analysis to evaluate the implemented digital logic",
      "Implementation: Completed FPGA implementation and programming using the AMD Vivado toolchain"
    ],

    github: "",
    demo: ""
  },


  {
    title: "PCB Business Card",
    status: "In Fabrication",
    image: "assets/pcb-business-card.jpg",

    description:
      "A personal electrical and hardware design project focused on creating a functional PCB business card with an integrated 555 timer circuit. The project began with systems engineering techniques to establish requirements, design goals, constraints, and planned verification before progressing through schematic capture, PCB layout, engineering review, and fabrication preparation.",

    layers: [
      "Systems Engineering: Defined requirements, design goals, constraints, risks, and planned verification activities",
      "Circuit Design: Designed a functional circuit centered around a 555 timer",
      "PCB Design: Completed schematic capture and PCB layout using KiCad",
      "Design Review: Reviewed the completed design with another engineer before fabrication",
      "Manufacturing: Prepared and submitted the PCB design through JLCPCB for fabrication",
      "Validation: Planned electrical testing, functional verification, and design iteration once the fabricated boards arrive"
    ],

    github: "",
    demo: ""
  }

];