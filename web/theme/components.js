/**
 * Style overrides for Material UI components.
 *
 * @see https://github.com/mui-org/material-ui/tree/master/packages/mui-material/src
 */
const createComponents = () => ({
  MuiLink: {
    defaultProps: {
      underline: "none",
      onClick: handleClick,
    },
  },

  MuiTextField: {
    defaultProps: {
    variant: "standard",
      //  InputLabelProps: { shrink: true },
    },
  },

  MuiButton: {
    styleOverrides: {
      contained: {
        // boxShadow: "none",
        // "&:hover": {
        //   boxShadow: "none",
        // },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        // boxShadow: "none",
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        // fontSize: "1.125rem",
      },
    },
  },
});

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function handleClick(event) {
  const { target } = event.currentTarget;
  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    (!target || target === "_self") && // let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault();
    const { href } = event.currentTarget;
    import("history/browser").then((x) => x.default.push(href));
  }
}

export { createComponents };
