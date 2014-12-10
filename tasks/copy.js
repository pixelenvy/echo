module.exports = {
  javascript: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.js'],
      dest: '<%= package.paths.destination.dev %>/'
    }]
  },
  images: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.{png,jpg,jpeg,gif,svg}'],
      dest: '<%= package.paths.destination.dev %>/'
    }]
  },
  videos: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.{webm,mp4,.ogg.theora}'],
      dest: '<%= package.paths.destination.dev %>/'
    }]
  }
};
