const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definisanje schema za korisnika
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Uklanja eventualne suvišne razmake sa početka i kraja stringa
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // Pretvara email u mala slova
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimalna duzina lozinke
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Pre nego što se korisnik sačuva u bazi, heširaj lozinku
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Ako lozinka nije promenjena, preskoči
  const salt = await bcrypt.genSalt(10); // Generiši salt za heširanje
  this.password = await bcrypt.hash(this.password, salt); // Heširaj lozinku
  next();
});

// Metoda za upoređivanje lozinki
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Uporedi unetu lozinku sa heširanom
};

module.exports = mongoose.model('User', userSchema);
