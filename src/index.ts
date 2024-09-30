import express from 'express';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});