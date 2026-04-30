// ─── Primitives ────────────────────────────────────────────────────────────────

export { Button } from './primitives/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './primitives/Button/Button';

export { TextInput } from './primitives/TextInput/TextInput';
export type { TextInputProps, TextInputSize } from './primitives/TextInput/TextInput';

export { Checkbox } from './primitives/Checkbox/Checkbox';
export type { CheckboxProps, CheckboxSize } from './primitives/Checkbox/Checkbox';

export { RadioButton } from './primitives/RadioButton/RadioButton';
export type { RadioButtonProps, RadioButtonSize } from './primitives/RadioButton/RadioButton';

export { Select } from './primitives/Select/Select';
export type { SelectProps, SelectSize } from './primitives/Select/Select';

export { TextArea } from './primitives/TextArea/TextArea';
export type { TextAreaProps, TextAreaSize } from './primitives/TextArea/TextArea';

export { Toggle } from './primitives/Toggle/Toggle';
export type { ToggleProps, ToggleSize } from './primitives/Toggle/Toggle';

export { PasswordInput } from './primitives/PasswordInput/PasswordInput';
export type { PasswordInputProps, PasswordInputSize } from './primitives/PasswordInput/PasswordInput';

export { EmailInput } from './primitives/EmailInput/EmailInput';
export type { EmailInputProps, EmailInputSize } from './primitives/EmailInput/EmailInput';

export { PhoneInput } from './primitives/PhoneInput/PhoneInput';
export type { PhoneInputProps, PhoneInputSize } from './primitives/PhoneInput/PhoneInput';

export { SearchInput } from './primitives/SearchInput/SearchInput';
export type { SearchInputProps, SearchInputSize } from './primitives/SearchInput/SearchInput';

export { Heading } from './primitives/Heading/Heading';
export type { HeadingProps, HeadingLevel, HeadingSize, HeadingColor } from './primitives/Heading/Heading';

export { Text } from './primitives/Text/Text';
export type { TextProps, TextSize, TextWeight, TextColor, TextAs } from './primitives/Text/Text';

export { Alert } from './primitives/Alert/Alert';
export type { AlertProps, AlertVariant } from './primitives/Alert/Alert';

export { Badge } from './primitives/Badge/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './primitives/Badge/Badge';

export { Spinner } from './primitives/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './primitives/Spinner/Spinner';

export { Skeleton } from './primitives/Skeleton/Skeleton';
export type { SkeletonProps, SkeletonShape } from './primitives/Skeleton/Skeleton';

export { ProgressBar } from './primitives/ProgressBar/ProgressBar';
export type { ProgressBarProps, ProgressBarVariant, ProgressBarSize } from './primitives/ProgressBar/ProgressBar';

export { Divider } from './primitives/Divider/Divider';
export type { DividerProps, DividerOrientation } from './primitives/Divider/Divider';

export { NumberInput } from './primitives/NumberInput/NumberInput';
export type { NumberInputProps, NumberInputSize } from './primitives/NumberInput/NumberInput';

export { DateInput } from './primitives/DateInput/DateInput';
export type { DateInputProps, DateInputSize } from './primitives/DateInput/DateInput';

export { Avatar } from './primitives/Avatar/Avatar';
export type { AvatarProps, AvatarSize, AvatarShape } from './primitives/Avatar/Avatar';

export { Tabs, TabList, Tab, TabPanel } from './primitives/Tabs/Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from './primitives/Tabs/Tabs';

export { Tooltip } from './primitives/Tooltip/Tooltip';
export type { TooltipProps, TooltipPlacement } from './primitives/Tooltip/Tooltip';

export { Modal, ModalBody, ModalFooter } from './primitives/Modal/Modal';
export type { ModalProps, ModalBodyProps, ModalFooterProps, ModalSize } from './primitives/Modal/Modal';

export { ToastProvider, useToast } from './primitives/Toast/Toast';
export type { ToastProviderProps, ToastOptions, ToastItem, ToastVariant } from './primitives/Toast/Toast';

export { Label } from './primitives/Label/Label';
export type { LabelProps } from './primitives/Label/Label';

export { Hint } from './primitives/Hint/Hint';
export type { HintProps } from './primitives/Hint/Hint';

export { ErrorMessage } from './primitives/ErrorMessage/ErrorMessage';
export type { ErrorMessageProps } from './primitives/ErrorMessage/ErrorMessage';

// ─── Components (composites) ───────────────────────────────────────────────────

export { TextField } from './components/TextField/TextField';
export type { TextFieldProps } from './components/TextField/TextField';

export { CheckboxField } from './components/CheckboxField/CheckboxField';
export type { CheckboxFieldProps } from './components/CheckboxField/CheckboxField';

export { SelectField } from './components/SelectField/SelectField';
export type { SelectFieldProps, SelectOption } from './components/SelectField/SelectField';

export { RadioGroup } from './components/RadioGroup/RadioGroup';
export type { RadioGroupProps, RadioOption } from './components/RadioGroup/RadioGroup';

export { TextAreaField } from './components/TextAreaField/TextAreaField';
export type { TextAreaFieldProps } from './components/TextAreaField/TextAreaField';

export { ToggleField } from './components/ToggleField/ToggleField';
export type { ToggleFieldProps } from './components/ToggleField/ToggleField';

export { PasswordField } from './components/PasswordField/PasswordField';
export type { PasswordFieldProps } from './components/PasswordField/PasswordField';

export { EmailField } from './components/EmailField/EmailField';
export type { EmailFieldProps } from './components/EmailField/EmailField';

export { PhoneField } from './components/PhoneField/PhoneField';
export type { PhoneFieldProps } from './components/PhoneField/PhoneField';

export { SearchField } from './components/SearchField/SearchField';
export type { SearchFieldProps } from './components/SearchField/SearchField';

export { NumberField } from './components/NumberField/NumberField';
export type { NumberFieldProps } from './components/NumberField/NumberField';

export { DateField } from './components/DateField/DateField';
export type { DateFieldProps } from './components/DateField/DateField';

// ─── ThemeProvider ─────────────────────────────────────────────────────────────

export { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
export type { ThemeProviderProps, Theme, ResolvedTheme, ThemeContextValue } from './components/ThemeProvider/ThemeProvider';
export { useTheme } from './components/ThemeProvider/useTheme';

// ─── Layout components ─────────────────────────────────────────────────────────

export { Stack } from './components/Stack/Stack';
export type { StackProps, StackDirection, StackAlign, StackJustify, SpacingKey } from './components/Stack/Stack';

export { Grid } from './components/Grid/Grid';
export type { GridProps, GridCols, GridSpacingKey, ResponsiveGridCols } from './components/Grid/Grid';

export { Container } from './components/Container/Container';
export type { ContainerProps, ContainerSize } from './components/Container/Container';

export { Card } from './components/Card/Card';
export type { CardProps, CardVariant, CardPadding } from './components/Card/Card';

export { Banner } from './components/Banner/Banner';
export type { BannerProps, BannerVariant, BannerLayout } from './components/Banner/Banner';

export { Carousel } from './components/Carousel/Carousel';
export type { CarouselProps } from './components/Carousel/Carousel';

export { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/Breadcrumb';

export { Navbar } from './components/Navbar/Navbar';
export type { NavbarProps, NavItem } from './components/Navbar/Navbar';

export { Sidebar } from './components/Sidebar/Sidebar';
export type { SidebarProps, SidebarItem } from './components/Sidebar/Sidebar';

export { DataTable } from './components/DataTable/DataTable';
export type { DataTableProps, TableColumn, SortDirection } from './components/DataTable/DataTable';

// ─── Chart components ──────────────────────────────────────────────────────────

export { BarChart } from './components/BarChart/BarChart';
export type { BarChartProps, BarChartDatum, BarChartSeries } from './components/BarChart/BarChart';

export { DonutChart } from './components/DonutChart/DonutChart';
export type { DonutChartProps, DonutSegment } from './components/DonutChart/DonutChart';

export { LineChart } from './components/LineChart/LineChart';
export type { LineChartProps, LineChartDatum, LineChartSeries } from './components/LineChart/LineChart';

export { ScatterPlot } from './components/ScatterPlot/ScatterPlot';
export type { ScatterPlotProps, ScatterDatum, ScatterSeries } from './components/ScatterPlot/ScatterPlot';

export { RadarChart } from './components/RadarChart/RadarChart';
export type { RadarChartProps, RadarSeries } from './components/RadarChart/RadarChart';

export { Section } from './components/Section/Section';
export type { SectionProps, SectionVariant, SectionPadding } from './components/Section/Section';

export { PageLayout } from './components/PageLayout/PageLayout';
export type { PageLayoutProps, PageLayoutSize } from './components/PageLayout/PageLayout';

export { AppShell } from './components/AppShell/AppShell';
export type { AppShellProps, AppShellVariant } from './components/AppShell/AppShell';

// ─── Patterns ─────────────────────────────────────────────────────────────────

export { AuthLayout } from './patterns/AuthLayout/AuthLayout';
export type { AuthLayoutProps } from './patterns/AuthLayout/AuthLayout';
