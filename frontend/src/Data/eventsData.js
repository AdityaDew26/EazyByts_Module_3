export const eventsData = [
  {
    _id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year!',
    date: '2024-03-15',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
  },
  {
    _id: '2',
    title: 'Music Festival',
    description: 'Experience the best music festival with top artists.',
    date: '2024-04-05',
    image: 'https://images.pexels.com/photos/1423587/pexels-photo-1423587.jpeg'
  },
  {
    _id: '3',
    title: 'Art Exhibition',
    description: 'Explore the creative world of modern art.',
    date: '2024-02-22',
    image: 'https://images.pexels.com/photos/2683604/pexels-photo-2683604.jpeg'
  },
  {
    _id: '4',
    title: 'Food Festival 2024',
    description: 'Taste the best cuisine from around the world.',
    date: '2024-05-20',
    image: 'https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg'
  },
  {
    _id: '5',
    title: 'Fashion Show',
    description: 'Witness the latest fashion trends from top designers.',
    date: '2024-06-10',
    image: 'https://wwd.com/wp-content/uploads/2024/09/Hannah-Shin_finale.jpg?w=1000&h=563&crop=1'
  },
  {
    _id: '6',
    title: 'Film Festival 2024',
    description: 'Watch award-winning films from around the world.',
    date: '2024-07-18',
    image: 'https://images.pexels.com/photos/3182789/pexels-photo-3182789.jpeg'
  },
  {
    _id: '7',
    title: 'Science Fair',
    description: 'Discover the latest breakthroughs in science and technology.',
    date: '2024-08-25',
    image: 'https://images.pexels.com/photos/2222357/pexels-photo-2222357.jpeg'
  },
  {
    _id: '8',
    title: 'Gaming Tournament',
    description: 'Join the competition for the ultimate gaming prize.',
    date: '2024-09-05',
    image: 'https://images.pexels.com/photos/3802166/pexels-photo-3802166.jpeg'
  },
  {
    _id: '9',
    title: 'Charity Run',
    description: 'Help raise funds for a good cause while staying active.',
    date: '2024-10-12',
    image: 'https://www.shutterstock.com/image-photo/shot-group-diverse-people-running-600nw-2408776271.jpg'
  },
  {
    _id: '10',
    title: 'Photography Workshop',
    description: 'Enhance your photography skills with industry experts.',
    date: '2024-11-02',
    image: 'https://images.pexels.com/photos/1887987/pexels-photo-1887987.jpeg'
  }
];

export const getEventById = (id) => {
  return eventsData.find(event => event._id === id);
};
