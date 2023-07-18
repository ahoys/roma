/**
 * Returns true if the given element is a child of an element.
 */
export const isChildOf = (
  child: EventTarget | null,
  parent: React.RefObject<Element>
) => {
  if (child === null) {
    return false;
  }
  const ae = document?.activeElement;
  if (parent && parent.current && (!window || child !== window)) {
    return (
      parent.current.contains(child as Node) ||
      parent.current.contains(ae as Node)
    );
  }
  return false;
};
