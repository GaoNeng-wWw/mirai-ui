export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ButtonVariant = 'solid' | 'ghost' | 'flat' | 'outline';
export type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonSized = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonProps = {
  /**
   * @zh 如果为true, 则显示loading动画
   * @en Show loading if true
   * @default false
   */
  loading?: boolean;
  /**
   * @zh 按钮原生类型, 会直接转发给 `type` 属性
   * @en Native type of button. Will direct put to `type` prop
   * @default 'button'
   */
  htmlType?: 'submit' | 'reset' | 'button';
  /**
   * @zh 按钮类型
   * @en type of color
   * @default 'solid'
   */
  variant?: ButtonVariant | undefined;
  /**
   * @zh 按钮圆角大小
   * @en rounded size of button
   * @default 'md'
   */
  rounded?: ButtonRounded | undefined;
  /**
   * @zh 按钮大小
   * @en size of button
   * @default 'md'
   */
  size?: ButtonSized | undefined;
  /**
   * @zh 按钮颜色
   * @en color of button
   * @default 'primary'
   */
  color?: ButtonColor | undefined;
  /**
   * @zh 是否是一个icon按钮, 如果为true, 则长宽为1:1
   * @en if `true`, `aspect-ratio` will be `1 / 1`
   */
  icon?: boolean | undefined;
  /**
   * @zh 如果设置为true, 将会禁用所有的事件与动效
   * @en if is true, will disabled motion and event.
   */
  disabled?: boolean | undefined;
  /**
   * @zh 宽度将会设置为 100%, 忽略 icon 属性
   * @en width will be 100%, ignore icon prop.
   */
  full?: boolean | undefined;
};
