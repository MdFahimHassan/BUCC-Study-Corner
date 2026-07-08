import bcrypt from 'bcryptjs';

const memoryUsers = [];
const memoryVideos = [];
let seeded = false;

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function ensureSeedData() {
  if (seeded) return;
  seeded = true;

  memoryUsers.push({
    _id: createId('user'),
    name: 'Admin User',
    email: 'admin@bucc.edu',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  memoryVideos.push({
    _id: createId('video'),
    title: 'React Basics',
    youtubeId: 'SqcY0GlETPk',
    category: 'Frontend',
    tags: ['react', 'frontend'],
    postedBy: memoryUsers[0]._id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export function isMemoryStoreEnabled() {
  return !process.env.MONGO_URI;
}

export async function findMemoryUserByEmail(email) {
  await ensureSeedData();
  return memoryUsers.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export async function findMemoryUserById(id) {
  await ensureSeedData();
  return memoryUsers.find((user) => user._id.toString() === id.toString()) || null;
}

export async function createMemoryUser({ name, email, password, role = 'user' }) {
  await ensureSeedData();
  const existing = await findMemoryUserByEmail(email);
  if (existing) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    _id: createId('user'),
    name,
    email: String(email).toLowerCase(),
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memoryUsers.push(user);
  return user;
}

export async function updateMemoryUserRole(id, role) {
  await ensureSeedData();
  const user = await findMemoryUserById(id);
  if (!user) return null;
  user.role = role;
  user.updatedAt = new Date().toISOString();
  return user;
}

export async function listMemoryVideos() {
  await ensureSeedData();
  return [...memoryVideos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createMemoryVideo({ title, youtubeId, category = 'General', tags = [], postedBy }) {
  await ensureSeedData();
  const video = {
    _id: createId('video'),
    title,
    youtubeId,
    category,
    tags,
    postedBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memoryVideos.unshift(video);
  return video;
}

export async function findMemoryVideoById(id) {
  await ensureSeedData();
  return memoryVideos.find((video) => video._id.toString() === id.toString()) || null;
}

export async function deleteMemoryVideo(id) {
  await ensureSeedData();
  const index = memoryVideos.findIndex((video) => video._id.toString() === id.toString());
  if (index === -1) return false;
  memoryVideos.splice(index, 1);
  return true;
}

export async function updateMemoryVideo(id, updates) {
  await ensureSeedData();
  const video = await findMemoryVideoById(id);
  if (!video) return null;
  Object.assign(video, updates, { updatedAt: new Date().toISOString() });
  return video;
}
