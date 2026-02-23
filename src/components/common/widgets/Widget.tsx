import { forwardRef } from 'react';
import { View, ViewProps} from "react-native";

export const Widget = forwardRef<View, ViewProps>(({ children, ...props }, ref) => (
  <View {...props} ref={ref}>
    {children}
  </View>
));
Widget.displayName = "Widget";