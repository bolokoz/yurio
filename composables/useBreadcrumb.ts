// It will be available as useFoo() (camelCase of file name without extension)
export default function () {
    const route = useRoute()
    const segments = route.path.split('/').slice(1);
    segments.length > 2 ? segments.pop() : segments
    const breadcrumbs = segments.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter
        route: '/' + segments.slice(0, index + 1).join('/'),
      };
    });
    return breadcrumbs;
  }