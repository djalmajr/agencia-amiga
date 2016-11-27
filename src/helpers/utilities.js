import cn from 'classnames';

const cnames = (styles, ...args) => {
  const result = [];

  args.forEach((arg) => {
    const classes = cn(arg);

    classes.split(' ').forEach((cname) => {
      if (styles[cname]) {
        result.push(styles[cname]);
      }
    });
  });

  return result.join(' ');
};

export default { cnames };
