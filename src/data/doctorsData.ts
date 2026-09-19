export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bg: string;
  bio: string;
  degreeTitle: string;
  degreeSub: string;
  experienceTitle: string;
  experienceSub: string;
  patientsTitle: string;
  patientsSub: string;
  isPresent?: boolean;
}

export const initialDoctors: DoctorProfile[] = [
  {
    id: 'john-smith',
    name: 'Dr. John Smith',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_john_smith.jpg',
    bg: '#EE9564', // Warm Peach / Orange
    bio: 'Pioneering digital smile design, Invisalign, and modern orthodontic alignment for patients of all ages.',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Orthodontics)',
    experienceTitle: '10+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,400+',
    patientsSub: 'Happy Patients',
    isPresent: true,
  },
  {
    id: 'david-kim',
    name: 'Dr. David Kim',
    specialty: 'Endodontics Specialist',
    image: '/images/doctor_david_kim.jpg',
    bg: '#C5AEE3', // Soft Lilac / Purple
    bio: 'Specializing in single-visit root canals, microscopic endodontics, and gentle tooth preservation.',
    degreeTitle: 'DDS, MS',
    degreeSub: '(Endodontics)',
    experienceTitle: '8+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,800+',
    patientsSub: 'Happy Patients',
    isPresent: true,
  },
  {
    id: 'sarah-lee',
    name: 'Dr. Sarah Lee',
    specialty: 'Periodontics Specialist',
    image: '/images/doctor_sarah_lee.jpg',
    bg: '#F6C844', // Golden Yellow
    bio: 'Specializes in gum care, dental implants, and advanced periodontal treatments. Dedicated to helping you achieve a healthier smile.',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Periodontology)',
    experienceTitle: '5+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,000+',
    patientsSub: 'Happy Patients',
    isPresent: true,
  },
  {
    id: 'steven-lee',
    name: 'Dr. Steven Lee',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctor_steven_lee.jpg',
    bg: '#82B3EB', // Ocean Sky Blue
    bio: 'Crafting bespoke porcelain veneers, laser teeth whitening, and complete aesthetic smile makeovers.',
    degreeTitle: 'DDS, FICOI',
    degreeSub: '(Cosmetic)',
    experienceTitle: '7+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,500+',
    patientsSub: 'Happy Patients',
    isPresent: true,
  },
  {
    id: 'jennifer-kim',
    name: 'Dr. Jennifer Kim',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_jennifer_kim.jpg',
    bg: '#7CBF6B', // Fresh Sage Green
    bio: 'Dedicated to gentle, personalized orthodontic treatments, invisible aligners, and adolescent smile corrections.',
    degreeTitle: 'BDS, MS',
    degreeSub: '(Orthodontics)',
    experienceTitle: '6+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,200+',
    patientsSub: 'Happy Patients',
    isPresent: true,
  },
];
